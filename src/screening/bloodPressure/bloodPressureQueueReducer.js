import { VISIT_TYPES } from "@openmrs/react-components";

const initialState = {};

// https://redux.js.org/recipes/structuring-reducers/reusing-reducer-logic

const filterPatientsByAge = (visits) => {
  return visits.filter(v => v.patient.person.age > 18);
};

const filterPatientsByEncounter = (visits) => {
  return visits.filter(v => {
    if (!v.encounters || v.encounters.size === 0) {
      return true;
    }
    else {
      return !(v.encounters.some(e => e.encounterType.uuid === "4fb47712-34a6-40d2-8ed3-e153abbd25b7"));
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



