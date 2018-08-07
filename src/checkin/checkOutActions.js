import CHECK_IN_TYPES from './checkInTypes';

const checkOutSubmitted = (patient, visit,  formSubmittedActionCreator) => ( {
  type: CHECK_IN_TYPES.CHECK_OUT.SUBMIT,
  patient: patient,
  visit: visit,
  formSubmittedActionCreator: formSubmittedActionCreator
});

const checkOutSucceeded = () => ( {
  type: CHECK_IN_TYPES.CHECK_OUT.SUCCEEDED
});

const checkOutFailed = (message) => ( {
  type: CHECK_IN_TYPES.CHECK_OUT.FAILED,
  error: {
    message: message
  }
});

export default {
  checkOutSubmitted,
  checkOutSucceeded,
  checkOutFailed
}