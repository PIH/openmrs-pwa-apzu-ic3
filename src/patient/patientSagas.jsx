import {call, put, takeLatest} from 'redux-saga/effects';
import {
  patientActions,
  patientUtil,
  visitActions
} from '@openmrs/react-components';
import ic3PatientActions from './patientActions';
import PATIENT_TYPES from './patientTypes';
import {IDENTIFIER_TYPES, ACTIVE_VISITS_REP} from '../constants';
import reportingRest from '../rest/reportingRest';

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

// change to use getting IC3 patients everywhere (instead of just active visits)
// make sure the definition of active visits is the same?
// or just make sure active visits doesn't add to store

// move out the initiate actions out of check in sage
// figure out why the form isn't being saved properly?
// figure out the get patient appt  when you find a patient ad hoc??
// figure out inactive visits. visits & filters
// figoure out actions, alerts and lab results

function* getIC3Patients(action) {

  try {

    yield put(patientActions.setPatientStoreUpdating());

    // get IC3 patients=those with appts + those with visits today
    let apptRestResponse = yield call(reportingRest.getIC3Patients, {
      location: action.location,
      endDate: action.endDate
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

function* ic3PatientSagas() {
  yield takeLatest(PATIENT_TYPES.GET_IC3_PATIENTS, getIC3Patients);
}

export default ic3PatientSagas;
