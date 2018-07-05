
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

export {
  visitRest
};
