import {put, takeEvery} from 'redux-saga/effects';
import {VISIT_TYPES, patientActions} from '@openmrs/react-components';


function* updateStore(action) {
  yield put(patientActions.updateActiveVisitsInStore(action.visits));
}

function* patientSagas() {
  yield takeEvery(VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED, updateStore);
}

export default patientSagas;
