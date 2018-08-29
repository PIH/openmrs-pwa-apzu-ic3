import patientActions from "../patientActions";
import PATIENT_TYPES from "../patientTypes";

describe('patient actions', () => {

  it('should create a clear patient selected action', () => {

    const expectedAction = {
      type: PATIENT_TYPES.CLEAR_SELECTED,
    };

    expect(patientActions.clearPatientSelected()).toEqual(expectedAction);
  });


  it('should create an add patient action', () => {

    let patient = {};
    patient.uuid = 'abc';

    const expectedAction = {
      type: PATIENT_TYPES.ADD,
      patient: patient
    };

    expect(patientActions.addPatient(patient)).toEqual(expectedAction);

  });
});
