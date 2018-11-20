import {call, put, takeLatest, select} from 'redux-saga/effects';
import {
  LOGIN_TYPES,
  patientActions,
  patientUtil, SESSION_TYPES,
  visitActions
} from '@openmrs/react-components';
import ic3PatientActions from './patientActions';
import PATIENT_TYPES from './patientTypes';
import {IDENTIFIER_TYPES, ACTIVE_VISITS_REP} from '../constants';
import reportingRest from '../rest/reportingRest';
import * as R from "ramda";
import utils from "../utils";
import PATIENT_APPT_TYPES from "./patientApptTypes";

const createFromReportingRestRep = (restRep) => {
  let patient = {};

  patient._openmrsClass = "Patient";
  patient.uuid = restRep.patient_uuid;
  patient.gender = restRep.gender;
  patient.age = restRep.age;
  patient.birthdate = restRep.birthdate;

  patient.name = {
    givenName: restRep.first_name,
    familyName: restRep.last_name
  };

  // TODO move the add identifier logic here?
  patient = patientUtil.addIdentifier(patient, restRep.art_number, IDENTIFIER_TYPES.ART_IDENTIFIER_TYPE);
  patient = patientUtil.addIdentifier(patient, restRep.hcc_number, IDENTIFIER_TYPES.EID_IDENTIFIER_TYPE);
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

  patient.alert = ""; // TODO add alerts back in, change to support array
  patient.labTests = []; // TODO add lab tests back in
  patient.actions = "";  // TODO add actions back in, change to support array


  return patient;
};

// why does it call the ic3 twice on cancel? at least on nutrition form
// age and identifers?
// figure out the get patient appt  when you find a patient ad hoc??
// figure out inactive visits. visits & filters
// figoure out actions, alerts and lab results

function* getIC3Patients(action) {

  try {

    yield put(patientActions.setPatientStoreUpdating());

    // get IC3 patients
    // if "loadExpectedAppointments" = true, set cohort to null, which means load both expected, and patients with visits
    // if false, explicitly ask for only patients with visits
    // we break this up because the load expected appointment is the slow part of the query and never changes,
    // so we can just call in on initial login, location change, or date change
    let apptRestResponse = yield call(reportingRest.getIC3Patients, {
      location: action.location,
      endDate: action.endDate,
      cohorts: action.loadExpectedAppointments ? null : 'patientsWithVisit'
    });

    let patients = apptRestResponse.map((result) => {
      return createFromReportingRestRep(result);
    });

    // add the IC3 patients to the store
    yield put(patientActions.updatePatientsInStore(patients));

    // then fetch the set of active visits
    yield put(visitActions.fetchActiveVisits(action.location, ACTIVE_VISITS_REP));

  } catch (e) {
    yield put(ic3PatientActions.getIC3PatientsFailed(e.message));
  }
}

// get the screening data for a single patient
function* getPatientApptData(action) {

  try {
    // get patient appointment info
    let apptRestResponse = yield call(reportingRest.getScreeningData, {
      endDate: utils.formatReportRestDate(new Date()),
      patients: action.patient.uuid
    });

    let patients = apptRestResponse.patients.map((result) => {
      return createFromReportingRestRep(result);
    });
    if (patients && patients.length > 0) {
      yield put(patientActions.updatePatientInStore(patients[0]));
    }

  } catch (e) {
    // TODO what should be thrown here?
  }

}

function* initiateGetIC3PatientsAction(action) {
  patientActions.clearPatientStore();
  var state = R.pathOr(yield select(), ['payload'], action);
  if (R.path(['openmrs', 'session', 'authenticated'], state)) {
    yield put(ic3PatientActions.getIC3Patients(
      R.path(['openmrs', 'session', 'sessionLocation', 'uuid'], state),
      utils.formatReportRestDate(new Date()),
      true));  // loadExpectedPatients = true
  }
}


function* ic3PatientSagas() {
  yield takeLatest(PATIENT_TYPES.GET_IC3_PATIENTS, getIC3Patients);
  yield takeLatest(PATIENT_APPT_TYPES.GET_APPT_DATA, getPatientApptData);
  yield takeLatest(LOGIN_TYPES.LOGIN.SUCCEEDED, initiateGetIC3PatientsAction);
  yield takeLatest(SESSION_TYPES.SET_SUCCEEDED, initiateGetIC3PatientsAction);
}

export default ic3PatientSagas;
