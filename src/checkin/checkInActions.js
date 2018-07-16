import CHECK_IN_TYPES from './checkInTypes';

const checkInSubmitted = (patient, visitType, encounterType, location, formSubmittedActionCreator) => ( {
  type: CHECK_IN_TYPES.SUBMIT,
  patient: patient,
  visitType: visitType,
  encounterType: encounterType,
  location: location,
  formSubmittedActionCreator: formSubmittedActionCreator
});

const checkInSucceeded = () => ( {
  type: CHECK_IN_TYPES.SUCCEEDED
});


const checkInFailed = (message) => ( {
  type: CHECK_IN_TYPES.FAILED,
  error: {
    message: message
  }
});

const expectedToCheckIn = (results) => ( {
  type: CHECK_IN_TYPES.EXPECTED_TO_CHECK_IN,
  results: results
});

const checkForVisits = () => ( {
  type: CHECK_IN_TYPES.CHECK_FOR_ACTIVE_VISITS
});

const checkForVisitsFailed = (message) => ( {
  type: CHECK_IN_TYPES.CHECK_FOR_VISITS_FAILED,
  message: message
});

export default {
  checkInSubmitted,
  checkInSucceeded,
  checkInFailed,
  checkForVisits,
  expectedToCheckIn,
  checkForVisitsFailed
};
