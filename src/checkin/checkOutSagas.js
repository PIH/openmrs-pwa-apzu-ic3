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
    yield put(checkOutActions.checkOutSucceeded());

  } catch (e) {
    yield put(checkOutActions.checkOutFailed(e.message));
  }
}

function *checkOutSagas() {
  yield takeEvery(CHECK_IN_TYPES.CHECK_OUT.SUBMIT, checkOut);
}

export default checkOutSagas;
