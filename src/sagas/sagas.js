
import { put, takeLatest } from 'redux-saga/effects';
import { LOGIN_ACTIONS, SESSION_ACTIONS } from "@openmrs/react-components";

function* onLogin() {
  // TODO this is mainly just for a test, will likely be refactored
  // reload session on login
  yield put({ type: SESSION_ACTIONS.FETCH_REQUESTED });
}

function* sagas() {
  yield takeLatest(LOGIN_ACTIONS.SUCCEEDED, onLogin);
}

export default sagas;

