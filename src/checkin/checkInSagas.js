import {call, put, takeLatest, select } from 'redux-saga/effects';
import {
  patientActions,
  formActions,
  patientUtil,
  visitRest,
  reportingRest,
  LOGIN_TYPES,
  SESSION_TYPES
} from '@openmrs/react-components';
import CHECK_IN_TYPES from './checkInTypes';
import checkInActions from './checkInActions';
import PATIENT_APPT_TYPES from '../patient/patientApptTypes';
import { IDENTIFIER_TYPES } from '../constants';
import uuidv4 from 'uuid/v4';
import utils from "../utils";
import * as R from 'ramda';

const createFromReportingRestRep =  (restRep) => {
  let patient = {};

  patient._openmrsClass = "Patient";
  patient.uuid = restRep.patient_uuid;
  patient.gender = restRep.gender;
  patient.age = restRep.age;
  patient.birthdate = restRep.birthdate;

  patient.name =  {
    givenName: restRep.first_name,
    familyName: restRep.last_name
  } ;

  // TODO move the add identifier logic here?
  patient = patientUtil.addIdentifier(patient, restRep.art_number, IDENTIFIER_TYPES.ART_IDENTIFIER_TYPE);
  patient = patientUtil.addIdentifier(patient, restRep.eid_number, IDENTIFIER_TYPES.EID_IDENTIFIER_TYPE);
  patient = patientUtil.addIdentifier(patient, restRep.ncd_number, IDENTIFIER_TYPES.NCD_IDENTIFIER_TYPE);

  // TODO how do we get these in a proper format
  patient.chw = restRep.vhw;
  patient.address = {
    village: restRep.village,
    traditionalAuthority: restRep.traditional_authority,
    district: restRep.district
  };

  patient.phoneNumber = restRep.phone_number;
  patient.lastAppointmentDate = restRep.last_appt_date;
  patient.lastVisitDate = restRep.last_visit_date;
  patient.actions = restRep.actions;
  patient.alert = restRep.alert;
  patient.labTests = restRep.labTests;

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
          encounterType: action.encounterType.uuid ? action.encounterType.uuid : action.encounterType,
          obs: action.obs
        }
      ]
    };

    yield call(visitRest.createVisit, { visit: visit });
    yield put(formActions.formSubmitSucceeded('check-in', action.formSubmittedActionCreator));

  } catch (e) {
    yield put(checkInActions.checkInFailed(e.message));
  }

}

function* getExpectedToCheckIn(action) {

  try {

    // get the appointment report for today at this location
    let apptRestResponse = yield call(reportingRest.getIC3Appt, {
      location: action.location,
      endDate:  action.endDate
    });

    let patients = apptRestResponse.patients.map((result) => {
      return createFromReportingRestRep(result);
    });

    yield put(patientActions.setPatientStore(patients));

  } catch (e) {
    yield put(checkInActions.getExpectedToCheckInFailed(e.message));
  }

}

function* getPatientApptData(action) {

  try {
    var state = R.pathOr(yield select(), ['payload'], action);
    // get patient appointment info
    let apptRestResponse = yield call(reportingRest.getIC3Appt, {
      location: R.path(['openmrs', 'session', 'sessionLocation', 'uuid'], state),
      endDate:  utils.formatReportRestDate(new Date()),
      patient: action.patient.uuid
    });

    let patients = apptRestResponse.patients.map((result) => {
      return createFromReportingRestRep(result);
    });
    if (patients && patients.length > 0 ) {
      yield put(patientActions.updatePatientInStore(patients[0]));
    }

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
  yield takeLatest(PATIENT_APPT_TYPES.GET_APPT_DATA, getPatientApptData);
}

export default checkInSagas;
