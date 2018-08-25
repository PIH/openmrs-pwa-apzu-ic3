import { GRID_TYPES } from "@openmrs/react-components";
import PATIENT_TYPES from './patientTypes';

const initialState = null;

// TODO could this be refactored to react components
// TODO should be based on an explicit select patient action (right now we will start running into trouble if we use the Grid for anything else besides patients)
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
