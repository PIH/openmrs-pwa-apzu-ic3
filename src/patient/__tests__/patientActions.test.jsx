import PATIENT_TYPES from "../patientTypes";
import patientActions from '../patientActions';

describe('patientActions', () => {


  it('should create a GET_IC3_PATIENTS action', () => {

    const expectedAction = {
      type: PATIENT_TYPES.GET_IC3_PATIENTS,
      location: "some_location",
      loadExpectedAppointments: false,
      endDate: "some_end_date"
    };

    expect(patientActions.getIC3Patients("some_location", "some_end_date")).toEqual(expectedAction);
  });


  it('should create a GET_IC3_PATIENTS_FAILED action', () => {

    const expectedAction = {
      type: PATIENT_TYPES.GET_IC3_PATIENTS_FAILED,
      message: "some_message"
    };

    expect(patientActions.getIC3PatientsFailed("some_message")).toEqual(expectedAction);
  });

});


