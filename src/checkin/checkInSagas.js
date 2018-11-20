import {call, put, takeLatest} from 'redux-saga/effects';
import {
  formActions,
  visitRest,
} from '@openmrs/react-components';
import CHECK_IN_TYPES from './checkInTypes';
import checkInActions from './checkInActions';
import uuidv4 from 'uuid/v4';

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


function *checkInSagas() {
  yield takeLatest(CHECK_IN_TYPES.CHECK_IN.SUBMIT, checkIn);
}

export default checkInSagas;
