import PATIENT_TYPES from "./patientTypes";

const addPatient = (patient) => ( {
  patient: patient,
  type: PATIENT_TYPES.ADD
} );

const clearPatientSelected = () => ( {
  type: PATIENT_TYPES.CLEAR_SELECTED
} );

export default {
  addPatient,
  clearPatientSelected
};
