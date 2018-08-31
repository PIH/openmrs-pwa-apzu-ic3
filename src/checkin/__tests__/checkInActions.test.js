import checkInActions from "../checkInActions";
import CHECK_IN_TYPES from "../checkInTypes";

describe('check in actions', () => {

  it('should create a check-in submitted action', () => {

    const expectedAction = {
      type: CHECK_IN_TYPES.CHECK_IN.SUBMIT,
      patient: "some_patient",
      visitType: "some_visit_type",
      encounterType: "some_encounter_type",
      obs: "some_obs",
      location: "some_location",
      formSubmittedActionCreator: "some_form_submitted_action_creator"
    };

    expect(checkInActions.checkInSubmitted("some_patient", "some_visit_type", "some_encounter_type", "some_obs", "some_location", "some_form_submitted_action_creator")).toEqual(expectedAction);
  });


  it('should create a check-in succeeded action', () => {

    const expectedAction = {
      type: CHECK_IN_TYPES.CHECK_IN.SUCCEEDED,
    };

    expect(checkInActions.checkInSucceeded()).toEqual(expectedAction);
  });


  it('should create a check-in failed action', () => {

    const expectedAction = {
      type: CHECK_IN_TYPES.CHECK_IN.FAILED,
      error: {
        message: "some_message"
      }
    };

    expect(checkInActions.checkInFailed("some_message")).toEqual(expectedAction);
  });

});
