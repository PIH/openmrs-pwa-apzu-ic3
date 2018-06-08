import { VISIT_TYPES } from "@openmrs/react-components";

const initialState = {};

const filterPatientsByAge = (visits) => {
  return visits.filter(v => v.patient.person.age > 18);
};

const filterPatientsByEncounter = (visits) => {
  return visits.filter(v => {
    if (!v.encounters || v.encounters.size === 0) {
      return true;
    }
    else {
      return !(v.encounters.some(e => e.encounterType.uuid === "55a0d3ea-a4d7-4e88-8f01-5aceb2d3c61b"));
    }
  })
}

export default (state = initialState, action) => {
  switch (action.type) {
    case VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED:
      return Object.assign({}, state, {
        results: filterPatientsByAge(filterPatientsByEncounter(action.visits))
      });
    default: return state;
  }
};



