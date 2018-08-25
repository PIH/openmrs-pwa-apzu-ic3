import { mapObjIndexed } from 'ramda';
import { Patient, VISIT_TYPES } from "@openmrs/react-components";
import CHECK_IN_TYPES from '../checkin/checkInTypes';
import PATIENT_TYPES from './patientTypes';

// TODO would be good to make this more generic to support adding from a variety of queries, sources?
// TODO should all the cass here expect to receive either a list of Patients or a single Patient?
// TODO and in this case, could this be moved to React Components?
export default (state = {}, action) => {

  switch (action.type) {

    // currently, the appt report is run one-time on loading the home page
    // this case will overwrite anything in this list with the data
    // returned from that report
    // note that the saga that loads the report formats the data as Patient
    // objects, but it doesn't 100% conform to the expected format,
    // for instance identifier are stored in a different format (this will be fixed)
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

    // currently, the active visits query is run every time a queue page is loaded,
    // and at regular intervals (ever 10 seconds)
    // this case will append the "visit" component of any existing patient record
    // as well as add any patients that are not found in the list
    // should the "create from REST rep" happen here, or in the saga? ie, do we want to make this more generic?
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

    // adds a patient to the list, if necessary
    // we currently use this to add a patient selected by patient search
    // in the future, should think abot whether this should really be an "add or update"
    case PATIENT_TYPES.ADD:

      // if the patient already in the list, do nothing
      if (!action.patient || action.patient.uuid in state) {
        return state;
      }
      else {
        return {
          [action.patient.uuid]: action.patient,
          ...state
        };
      }


    default: return state;
  }
};


