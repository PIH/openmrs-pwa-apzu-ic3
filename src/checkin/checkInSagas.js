import { call, put, takeEvery } from 'redux-saga/effects';
import { Patient, patientRest, visitRest } from '@openmrs/react-components';
import CHECK_IN_TYPES from './checkInTypes';
import checkInActions from './checkInActions';
import uuidv4 from 'uuid/v4';
import { PATIENT_REPRESENTATION } from "../constants";


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
    // for now, just get a random list of patients
    let response = yield call(patientRest.findPatient, {
      query: 'Bob',
      representation: "custom:" + PATIENT_REPRESENTATION
    });
    // get a list of active visits
    let visitResponse = yield call(visitRest.getActiveVisits, {
      representation: "custom:(uuid,patient:" + PATIENT_REPRESENTATION + ")"
    });

    // exclude from the random list of patients fetched above the patients who have an active visit
    let expectedPatients = response.results.filter(function(patient) {
      let activeVisit = visitResponse.results.find(function(visit) {
        return visit.patient.uuid === patient.uuid;
      });
      if (typeof activeVisit === 'undefined') {
        return true;
      } else {
        return false;
      }
    });

    let patients = expectedPatients.map((result) => {
      return Patient.createFromRestRep(result);
    });

    yield put(checkInActions.expectedToCheckIn(patients));

  } catch (e) {
    yield put(checkInActions.getExpectedToCheckInFailed(e.message));
  }


}

function *checkInSagas() {
  yield takeEvery(CHECK_IN_TYPES.SUBMIT, checkIn);
  yield takeEvery(CHECK_IN_TYPES.GET_EXPECTED_PATIENTS_TO_CHECKIN, getExpectedToCheckIn);
}

export default checkInSagas;
