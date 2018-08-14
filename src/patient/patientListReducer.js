import { VISIT_TYPES, visitRestRepToPatientObjConverter } from "@openmrs/react-components";

// TODO this will have to be refactored to handle all the different types of reducers, etc

// TODO active visits will need to update, not create


export default (state = [], action) => {
  switch (action.type) {
    case VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED:
      return action.visits.map(visitRestRepToPatientObjConverter());
    default: return state;
  }
};


