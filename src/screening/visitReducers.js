import { VISIT_TYPES } from "@openmrs/react-components";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case VISIT_TYPES.PATIENT_ACTIVE_VISIT.FETCH_SUCCEEDED:
      return Object.assign({}, state, {
        activeVisit: action.patientActiveVisit
      });

    case VISIT_TYPES.PATIENT_ACTIVE_VISIT.FETCH_FAILED:
      return {
        error: {
          message: "Failed to retrieve active visit for patient"
        }
      };
    default:
      return state;
  }
};