import { call, put, takeLatest } from 'redux-saga/effects';
import { patientActions } from '@openmrs/react-components';
import PATIENT_TYPES from '../../patient/patientTypes';
import reportingRest from '../../rest/reportingRest';

function* fetAndSetNutritionHistory(action) {

  try {
    yield put(patientActions.setPatientStoreUpdating());

    let results = yield call(reportingRest.getIC3NutritionHistory, {
      patient: action.patient.uuid,
    });

    if (results) {
      yield put({
        type: PATIENT_TYPES.GET_NUTRITION_HISTORY_SUCCEEDED,
        nutritionHistory: results,
      });
    }
    yield put(patientActions.setPatientStoreNotUpdating());
  }
  catch (e) {
    yield put({
      type: PATIENT_TYPES.GET_NUTRITION_HISTORY_FAILED,
      message: e,
    });
  }
}

function* nutritionSagas() {
  yield takeLatest(PATIENT_TYPES.GET_NUTRITION_HISTORY, fetAndSetNutritionHistory);
}

export default nutritionSagas;