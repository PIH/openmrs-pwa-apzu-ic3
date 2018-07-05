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

export default {
  checkInSubmitted,
  checkInSucceeded,
  checkInFailed
};
