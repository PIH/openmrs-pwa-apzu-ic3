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

const getExpectedToCheckIn = () => ( {
  type: CHECK_IN_TYPES.GET_EXPECTED_PATIENTS_TO_CHECKIN
});

const getExpectedToCheckInFailed = (message) => ( {
  type: CHECK_IN_TYPES.GET_EXPECTED_TO_CHECKIN_FAILED,
  message: message
});

export default {
  checkInSubmitted,
  checkInSucceeded,
  checkInFailed,
  getExpectedToCheckIn,
  expectedToCheckIn,
  getExpectedToCheckInFailed
};
