import { VISIT_TYPES, visitRestRepToPatientObjConverter } from "@openmrs/react-components";

// TODO this will have to be refactored to handle all the different types of reducers, etc

// TODO active visits will need to update, not create

export default (state = new Map(), action) => {
  switch (action.type) {
    case VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED:
      action.visits.map(visitRestRepToPatientObjConverter()).forEach((p) => {
        state.set(p.uuid, p);
      });
      return state;
    default: return state;
  }
};


