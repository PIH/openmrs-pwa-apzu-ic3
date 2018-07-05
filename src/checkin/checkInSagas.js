import { call, put, takeEvery } from 'redux-saga/effects';
import { visitRest } from '@openmrs/react-components';
import CHECK_IN_TYPES from './checkInTypes';
import checkInActions from './checkInActions';
//import uuidv4 from 'uuid/v4';


function* checkIn(action) {

  try {

   // let encounterUuid = uuidv4();
    let today = new Date();
    // create visit with encounter
    let visit = {
      patient: action.patient.uuid ? action.patient.uuid : action.patient,
      startDatetime: today,
      location: action.location.uuid ? action.location.uuid : action.location,
      visitType: action.visitType.uuid ? action.visitType.uuid: action.visitType,
      // TODO figure out why creating encounter isn't working
    /*  encounters: [
        {
          uuid: encounterUuid,
          patient: action.patient.uuid ? action.patient.uuid : action.patient,
          location: action.location.uuid ? action.location.uuid : action.location,
          encounterType: action.encounterType.uuid ? action.encounterType.uuid : action.encounterType,
          encounterDatetime: today
        }
      ],*/
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

function *checkInSagas() {
  yield takeEvery(CHECK_IN_TYPES.SUBMIT, checkIn);
}

export default checkInSagas;
