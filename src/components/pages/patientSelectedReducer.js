import { PATIENT_SEARCH_TYPES } from "@openmrs/react-components";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case PATIENT_SEARCH_TYPES.PATIENT_SELECTED:
      return Object.assign({}, state, {
        patient: action.row
      });
    case PATIENT_SEARCH_TYPES.CLEAR_SELECTED:
      return Object.assign({}, state, {
        patient: null
      });
    default: return state;
  }
};
