import formActions from '../formActions';
import FORM_TYPES from '../formTypes';

describe('form actions', () => {

  it('should create action for form submit submitted', () => {

    const patient = {
      uuid: "some_uuid"
    };

    const encounterType = {
      uuid: "some_uuid"
    };

    const visit = {
      uuid: "some_uuid"
    };

    const formSubmittedActionCreator = jest.fn();

    const expectedAction = {
      type: FORM_TYPES.SUBMIT,
      values: "some_values",
      patient: patient,
      encounterType: encounterType,
      visit: visit,
      formSubmittedActionCreator: formSubmittedActionCreator
    };

    expect(formActions.formSubmitted("some_values", patient, encounterType, visit, formSubmittedActionCreator)).toEqual(expectedAction);

  });

  it('should create action for form submit succeeeded', () => {

    const formSubmittedActionCreator = jest.fn();

    const expectedAction = {
      type: FORM_TYPES.SUBMIT_SUCCEEDED,
      formSubmittedActionCreator: formSubmittedActionCreator
    };

    expect(formActions.formSubmitSucceeded(formSubmittedActionCreator)).toEqual(expectedAction);

  });

  it('should create action for form submit failed', () => {

    const expectedAction = {
      type: FORM_TYPES.SUBMIT_FAILED,
      error: {
        message: "some_message"
      }
    };
    expect(formActions.formSubmitFailed("some_message")).toEqual(expectedAction);

  });

});
