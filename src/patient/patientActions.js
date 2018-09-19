import PATIENT_TYPES from "./patientTypes";

const addPatient = (patient) => ( {
  patient: patient,
  type: PATIENT_TYPES.ADD
} );

const updatePatient = (patient) => ( {
  patient: patient,
  type: PATIENT_TYPES.UPDATE
} );

const getPatientApptData = (patient) => ( {
  patient: patient,
  type: PATIENT_TYPES.GET_APPT_DATA
} );

const clearPatientSelected = () => ( {
  type: PATIENT_TYPES.CLEAR_SELECTED
} );

export default {
  addPatient,
  updatePatient,
  getPatientApptData,
  clearPatientSelected
};
