import patientActions from "../patientActions";
import PATIENT_TYPES from "../patientTypes";

describe('patient actions', () => {

  it('should create a clear patient selected action', () => {

    const expectedAction = {
      type: PATIENT_TYPES.CLEAR_SELECTED,
    };

    expect(patientActions.clearPatientSelected()).toEqual(expectedAction);
  });
});
