import { call, put, takeLatest } from 'redux-saga/effects';
import { Patient, visitRest,  reportingRest } from '@openmrs/react-components';
import CHECK_IN_TYPES from './checkInTypes';
import checkInActions from './checkInActions';
import uuidv4 from 'uuid/v4';

const createFromReportingRestRep =  (restRep) => {
  let patient = new Patient();

  patient.uuid = restRep.patient_uuid;
  patient.gender = restRep.gender;
  patient.age = restRep.age;
  patient.birthdate = restRep.birthdate;

  patient.name =  {
    givenName: restRep.first_name,
    familyName: restRep.last_name
  } ;


  // TODO these all should be modified to conform to the proper Patient format?
  patient.identifiers = {
    artNumber: restRep.art_number,
    eidNumber: restRep.eid_number,
    ncdNumber: restRep.ncd_number
  };

  // TODO how do we get these in a proper format
  patient.chw = restRep.vhw;
  patient.village = restRep.village;
  patient.actions = restRep.actions;
  patient.alert = restRep.alert;

  return patient;
}


function* checkIn(action) {

  try {

    let encounterUuid = uuidv4();
    // create visit (defaults to current datetime to handle time zone issue on tablets)
    let visit = {
      patient: action.patient.uuid ? action.patient.uuid : action.patient,
      location: action.location.uuid ? action.location.uuid : action.location,
      visitType: action.visitType.uuid ? action.visitType.uuid: action.visitType,
      // TODO figure out why creating encounter isn't working
      encounters: [
        {
          uuid: encounterUuid,
          patient: action.patient.uuid ? action.patient.uuid : action.patient,
          location: action.location.uuid ? action.location.uuid : action.location,
          encounterType: action.encounterType.uuid ? action.encounterType.uuid : action.encounterType
        }
      ]
    };

    yield call(visitRest.createVisit, { visit: visit });
    yield put(checkInActions.checkInSucceeded());

    if (action.formSubmittedActionCreator) {
      yield put(action.formSubmittedActionCreator());
    }

  } catch (e) {
    yield put(checkInActions.checkInFailed(e.message));
  }

}

function* getExpectedToCheckIn(action) {

  try {

    // get the appointment report for today at this location
    let apptRestResponse = yield call(reportingRest.getDataSet, {
      datasetName: 'pihmalawi.dataset.ic3AppointmentData',
      location: action.location,
      endDate:  action.endDate
    });

    let patients = apptRestResponse.rows.map((result) => {
      return createFromReportingRestRep(result);
    });

    yield put(checkInActions.expectedToCheckIn(patients));

  } catch (e) {
    yield put(checkInActions.getExpectedToCheckInFailed(e.message));
  }


}

function *checkInSagas() {
  yield takeLatest(CHECK_IN_TYPES.CHECK_IN.SUBMIT, checkIn);
  yield takeLatest(CHECK_IN_TYPES.CHECK_IN.GET_EXPECTED_PATIENTS_TO_CHECKIN, getExpectedToCheckIn);
}

export default checkInSagas;
