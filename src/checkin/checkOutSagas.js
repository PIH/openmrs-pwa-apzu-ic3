import { call, put, takeEvery } from 'redux-saga/effects';
import { visitRest } from '@openmrs/react-components';
import CHECK_IN_TYPES from './checkInTypes';
import checkOutActions from './checkOutActions';

function* checkOut(action) {

  try {

    let visit = {
      uuid: action.visit.uuid,
      stopDatetime: new Date()
    };

    yield call(visitRest.closeVisit, { visit: visit });
    yield put(checkOutActions.checkOutSucceeded(action.formSubmittedActionCreator));

  } catch (e) {
    yield put(checkOutActions.checkOutFailed(e.message));
  }
}

function* checkOutSucceeded(action) {
  if (action.formSubmittedActionCreator) {
    if (typeof action.formSubmittedActionCreator === "function") {
      yield put(action.formSubmittedActionCreator());
    }
    else if (Array.isArray(action.formSubmittedActionCreator)) {
      for (let i = 0; i < action.formSubmittedActionCreator.length; i++) {
        yield put(action.formSubmittedActionCreator[i]());
      }
    }
  }
}

function *checkOutSagas() {
  yield takeEvery(CHECK_IN_TYPES.CHECK_OUT.SUBMIT, checkOut);
  yield takeEvery(CHECK_IN_TYPES.CHECK_OUT.SUCCEEDED, checkOutSucceeded);
}

export default checkOutSagas;
