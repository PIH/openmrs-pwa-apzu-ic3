
// mock methods

const visitRest = {

  createVisit: (params) => {

    const visit = params.visit;

    if (visit.patient != 'patient_uuid' || visit.visitType != 'visit_type_uuid' || visit.location != 'location_uuid') {
      throw {
        name: 'Mock Exception',
        message: 'Unable to Submit'
      };
    }
    else {
      return;
    }
  }

};

const encounterRest = {

  createEncounter: (params) => {

    if (params.encounter.encounterType === 'invalid_encounter_type') {
      throw {
        name: 'Mock Exception',
        message: 'Unable to Submit'
      };
    }
    else {
      return;
    }
  }

};

export {
  visitRest,
  encounterRest
};
