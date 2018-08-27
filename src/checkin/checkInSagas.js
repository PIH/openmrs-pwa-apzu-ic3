import { call, put, takeLatest, select } from 'redux-saga/effects';
import { Patient, visitRest,  reportingRest, LOGIN_TYPES, SESSION_TYPES } from '@openmrs/react-components';
import CHECK_IN_TYPES from './checkInTypes';
import checkInActions from './checkInActions';
import { IDENTIFIER_TYPES } from '../constants';
import uuidv4 from 'uuid/v4';
import utils from "../utils";
import * as R from 'ramda';

const createFromReportingRestRep =  (restRep) => {
  let patient = new Patient();

  patient.setUuid(restRep.patient_uuid);
  patient.setGender(restRep.gender);
  patient.setAge(restRep.age);
  patient.setBirthdate(restRep.birthdate);
  patient.setName({
    givenName: restRep.first_name,
    familyName: restRep.last_name
  });

  patient.addIdentifier(restRep.art_number, IDENTIFIER_TYPES.ART_IDENTIFIER_TYPE.uuid);
  patient.addIdentifier(restRep.eid_number, IDENTIFIER_TYPES.EID_IDENTIFIER_TYPE.uuid);
  patient.addIdentifier(restRep.ncd_number, IDENTIFIER_TYPES.NCD_IDENTIFIER_TYPE.uuid);

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

function* initiateGetExpectedToCheckIn(action) {
  var state = R.pathOr(yield select(), ['payload'], action);
  if (R.path(['openmrs', 'session', 'authenticated'], state)){
    yield put(checkInActions.getExpectedToCheckIn(R.path(['openmrs', 'session', 'sessionLocation', 'uuid'], state),
                                                  utils.formatReportRestDate(new Date())));
  }
}

function *checkInSagas() {
  yield takeLatest(CHECK_IN_TYPES.CHECK_IN.SUBMIT, checkIn);
  yield takeLatest(CHECK_IN_TYPES.CHECK_IN.GET_EXPECTED_PATIENTS_TO_CHECKIN, getExpectedToCheckIn);
  yield takeLatest(LOGIN_TYPES.LOGIN.SUCCEEDED, initiateGetExpectedToCheckIn);
  yield takeLatest(SESSION_TYPES.SET_SUCCEEDED, initiateGetExpectedToCheckIn);
}

export default checkInSagas;
