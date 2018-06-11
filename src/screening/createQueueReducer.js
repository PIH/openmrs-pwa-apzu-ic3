import { VISIT_TYPES } from "@openmrs/react-components";

const createQueueReducer = (encounterTypeUuid, additionalFilters = []) =>  {

  const patientsByEncounterFilter = (visit) => {
    if (encounterTypeUuid && (!visit.encounters || visit.encounters.size === 0)) {
      return true;
    }
    else {
      return !(visit.encounters.some(e => e.encounterType.uuid === encounterTypeUuid));
    }
  };

  const applyFilters = (visits, filters) => {
    if (filters.length === 0) {
      return visits;
    }
    else {
      return applyFilters(visits.filter(filters.pop()), filters)
    }
  };

  return (state = {}, action) => {
    switch (action.type) {
      case VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED:
        return Object.assign({}, state, {
          results: applyFilters(action.visits, additionalFilters.concat(patientsByEncounterFilter))
        });
      default: return state;
    }
  };
};

export default createQueueReducer;
