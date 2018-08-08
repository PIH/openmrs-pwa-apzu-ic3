import { GRID_TYPES } from "@openmrs/react-components";
import PATIENT_TYPES from './patientTypes';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GRID_TYPES.ROW_SELECTED:
      return Object.assign({}, state,
        action.row
      );
    case GRID_TYPES.CLEAR_SELECTED:
    case PATIENT_TYPES.CLEAR_SELECTED:
      return Object.assign({}, state, {
        uuid: null
      }
      );
    default: return state;
  }
};
