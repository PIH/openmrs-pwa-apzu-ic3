import { Patient, VISIT_TYPES } from "@openmrs/react-components";

const createQueueReducer = (encounterTypeUuid, additionalFilters = []) =>  {

  const filterByEncounterType = (visit) => {

    if (!encounterTypeUuid || !visit.encounters || visit.encounters.size === 0) {
      return true;
    }
    else {
      return !(visit.encounters.some(e => e.encounterType.uuid === encounterTypeUuid && !e.voided));
    }
  };

  const applyFilters = (visits, filters) => {
    if (filters.length === 0) {
      return visits;
    }
    else {
      return applyFilters(visits.filter(filters.pop()), filters);
    }
  };

  const convertPatientRestRepToPatientObj = (visits) => {

    return visits.map((visit) => {
      return { ...visit, patient: Patient.createFromRestRep(visit.patient, visit.encounters) };
    });

  };

  const mapVisitsToPatients = (visits) => {
    return visits.map((visit) => {
      visit.patient.activeVisit = visit.uuid;
      return visit.patient;
    });
  };

  return (state = {}, action) => {
    switch (action.type) {
      case VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED:

        // given an list of active visits this:
        // 1) converts the "patient" component of each active visit from a rest rep to our Patient domain object (from react-components)
        // 2) applies the the "filter by encounter type filter", as well as any additionally provided filters, to the active visits list
        // 3) maps the active visits list to a list of Patients, adding the uuid of the visit as a property of the patient

        return Object.assign({}, state, {
          list: mapVisitsToPatients(applyFilters(convertPatientRestRepToPatientObj(action.visits), additionalFilters.concat(filterByEncounterType)))
        });
      default: return state;
    }
  };
};

export default createQueueReducer;
