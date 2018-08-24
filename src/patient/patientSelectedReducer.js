import { GRID_TYPES } from "@openmrs/react-components";
import PATIENT_TYPES from './patientTypes';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case GRID_TYPES.ROW_SELECTED:
      return action.row ? action.row.uuid : null;
    case GRID_TYPES.CLEAR_SELECTED:
    case PATIENT_TYPES.CLEAR_SELECTED:
      return null;
    default: return state;
  }
};
