import { mapObjIndexed } from 'ramda';
import { VISIT_TYPES } from "@openmrs/react-components";
import CHECK_IN_TYPES from '../checkin/checkInTypes';

export default (state = {}, action) => {

  // TODO should this really copy a patient instead of mutating an existing one?
  const addVisitIfFound = (patient, visits) => {

    if (visits == null) {
      return patient;
    }
    else {
      const visit = visits.find((v) => {
        return patient.uuid === v.patient.uuid;
      });

      if (visit != null) {
        patient.visit = visit;
      }

      return patient;
    }

  };

  switch (action.type) {

    case CHECK_IN_TYPES.CHECK_IN.EXPECTED_TO_CHECK_IN:

      if (action.patients == null) {
        return {};
      }
      else {
        return action.patients.reduce((acc, p) => {
          acc[p.uuid] = p;
          return acc;
        }, {});
      }

    case VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED:

      return mapObjIndexed((patient) => {
        addVisitIfFound(patient, action.visits);
        return patient;
      }, state);

    default: return state;
  }
};


