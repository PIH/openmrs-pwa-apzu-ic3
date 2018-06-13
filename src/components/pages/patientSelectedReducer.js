import { GRID_TYPES } from "@openmrs/react-components";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GRID_TYPES.ROW_SELECTED:
      return Object.assign({}, state, {
        patient: action.row
      });
    case GRID_TYPES.CLEAR_SELECTED:
      return Object.assign({}, state, {
        patient: null
      });
    default: return state;
  }
};
