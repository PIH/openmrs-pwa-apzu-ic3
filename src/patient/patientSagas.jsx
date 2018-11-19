import {call, put, takeLatest} from 'redux-saga/effects';
import {
  patientActions,
  patientUtil,
  reportingRest,
  visitActions
} from '@openmrs/react-components';
import ic3PatientActions from './patientActions';
import PATIENT_TYPES from './patientTypes';
import {IDENTIFIER_TYPES, ACTIVE_VISITS_REP} from '../constants';

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
};

function* getIC3Patients(action) {

  try {

    yield put(patientActions.setPatientStoreUpdating());

    // get the appointment report for today at this location
    let apptRestResponse = yield call(reportingRest.getIC3Appt, {
      location: action.location,
      endDate: action.endDate
    });

    let patients = apptRestResponse.patients.map((result) => {
      return createFromReportingRestRep(result);
    });

    yield put(patientActions.updatePatientsInStore(patients));
    yield put(visitActions.fetchActiveVisits(action.location, ACTIVE_VISITS_REP));

  } catch (e) {
    yield put(ic3PatientActions.getIC3PatientsFailed(e.message));
  }


}

function* ic3PatientSagas() {
  yield takeLatest(PATIENT_TYPES.GET_IC3_PATIENTS, getIC3Patients);
}

export default ic3PatientSagas;
