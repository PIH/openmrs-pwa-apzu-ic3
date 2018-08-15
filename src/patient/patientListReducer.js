import { mapObjIndexed } from 'ramda';
import { VISIT_TYPES } from "@openmrs/react-components";
import CHECK_IN_TYPES from '../checkin/checkInTypes';

export default (state = {}, action) => {

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

      // TODO do we want to copy over other information (demographics, etc?) if found?
      return mapObjIndexed((patient) => {
        return {
          ...patient,
          visit: action.visits != null ? action.visits.find((v) => {
            return patient.uuid === v.patient.uuid;
          }) : undefined
        };
      }, state);

    default: return state;
  }
};


