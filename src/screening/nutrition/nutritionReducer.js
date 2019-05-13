import IC3_PATIENT_TYPES from  '../../patient/patientTypes';

import types from 'redux-types';

const PATIENT_TYPES = types('patient', [
  'CLEAR_SELECTED_PATIENT',
]);


const initialState = {
  isUpdating: false,
  history: [],
};

// TODO: would be nice to have the UPDATE_PATIENT_IN_STORE action in react-components work not only for visits
// in that way we could always have additional properties
export default (state = initialState, action) => {
  switch (action.type) {
    case PATIENT_TYPES.CLEAR_SELECTED_PATIENT:
      return initialState;
    case IC3_PATIENT_TYPES.GET_NUTRITION_HISTORY_SUCCEEDED:
      return {
        ...state,
        history: action.nutritionHistory,
      };
    default:
      return state;
  }
};
