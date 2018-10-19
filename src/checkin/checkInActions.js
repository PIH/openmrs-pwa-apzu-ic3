import CHECK_IN_TYPES from './checkInTypes';

const checkInSubmitted = (patient, visitType, encounterType, obs, location, formSubmittedActionCreator) => ( {
  type: CHECK_IN_TYPES.CHECK_IN.SUBMIT,
  patient: patient,
  visitType: visitType,
  encounterType: encounterType,
  obs: obs,
  location: location,
  formSubmittedActionCreator: formSubmittedActionCreator
});

const checkInSucceeded = (formSubmittedActionCreator) => ( {
  type: CHECK_IN_TYPES.CHECK_IN.SUCCEEDED,
  formSubmittedActionCreator: formSubmittedActionCreator
});


const checkInFailed = (message) => ( {
  type: CHECK_IN_TYPES.CHECK_IN.FAILED,
  error: {
    message: message
  }
});

const getExpectedToCheckIn = (location, endDate) => ( {
  type: CHECK_IN_TYPES.CHECK_IN.GET_EXPECTED_PATIENTS_TO_CHECKIN,
  location: location,
  endDate: endDate
});

const getExpectedToCheckInFailed = (message) => ( {
  type: CHECK_IN_TYPES.CHECK_IN.GET_EXPECTED_TO_CHECKIN_FAILED,
  message: message
});

export default {
  checkInSubmitted,
  checkInSucceeded,
  checkInFailed,
  getExpectedToCheckIn,
  getExpectedToCheckInFailed
};
