import { VISIT_TYPES } from "@openmrs/react-components";
import CHECK_IN_TYPES from '../checkin/checkInTypes';

// TODO this will have to be refactored to handle all the different types of reducers, etc

// TODO active visits will need to update, not create

export default (state = new Map(), action) => {
  switch (action.type) {

    case CHECK_IN_TYPES.CHECK_IN.EXPECTED_TO_CHECK_IN:
      state = new Map();
      action.patients.forEach((p) => {
        state.set(p.uuid, p);
      });
      return state;

    case VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED:
      state = new Map(state);
      action.visits.forEach((v) => {
        if (state.has(v.patient.uuid)) {
          state.get(v.patient.uuid).visit = v;
        }
      });
      return state;

    default: return state;
  }
};


