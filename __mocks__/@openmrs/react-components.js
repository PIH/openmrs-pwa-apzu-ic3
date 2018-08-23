import types from 'redux-types';
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

const BASIC_TYPES = [
  'FETCH_SUCCEEDED',
  'FETCH_PENDING',
  'SET_SUCCEEDED',
  'SET_REQUESTED',
  'SET_FAILED',
  'FETCH_FAILED',
  'FETCH_REQUESTED',
  'SUCCEEDED',
  'PENDING',
  'FAILED',
  'REQUESTED'
];

const LOGIN_TYPES = {
  LOGIN: types('login', BASIC_TYPES),
  LOGIN_LOCATIONS: types('login_locations', BASIC_TYPES),
  LOGOUT: types('logout', BASIC_TYPES)
}

const SESSION_TYPES = types('session', BASIC_TYPES)


export {
  visitRest,
  encounterRest,
  LOGIN_TYPES,
  SESSION_TYPES
};
