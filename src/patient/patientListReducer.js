import { mapObjIndexed } from 'ramda';
import { Patient, VISIT_TYPES } from "@openmrs/react-components";
import CHECK_IN_TYPES from '../checkin/checkInTypes';

export default (state = {}, action) => {

  switch (action.type) {

    // currently, this will overwrite the list entirely
    case CHECK_IN_TYPES.CHECK_IN.EXPECTED_TO_CHECK_IN:

      if (action.patients == null) {
        return {};
      }
      else {
        return action.patients.reduce((acc, patient) => {
          acc[patient.uuid] = patient;
          return acc;
        }, {});
      }

    case VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED:

      // TODO do we want to copy over other information (demographics, etc?) if found?
      // TODO do we want to strip out patient information from visit to avoid duplication?

      const expectedPatientsWithVisits = mapObjIndexed((patient) => {
        return {
          ...patient,
          visit: action.visits != null ? action.visits.find((v) => {
            return patient.uuid === v.patient.uuid;
          }) : undefined
        };
      }, state);

      // add in any missing patients that have active visits but aren't in expected list
      if (action.visits != null) {
        return action.visits.filter((visit) => {
          return !(visit.patient.uuid in expectedPatientsWithVisits);
        }).reduce((acc, visit) => {
          acc[visit.patient.uuid] =
            Patient.createFromRestRep(visit.patient, visit);
          return acc;
        }, expectedPatientsWithVisits);
      }
      else {
        return expectedPatientsWithVisits;
      }


    // this adds active visits to expected patients list
   /* case VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED:

      // TODO do we want to copy over other information (demographics, etc?) if found?
      return mapObjIndexed((patient) => {
        return {
          ...patient,
          visit: action.visits != null ? action.visits.find((v) => {
            return patient.uuid === v.patient.uuid;
          }) : undefined
        };
      }, state);
*/

    default: return state;
  }
};


