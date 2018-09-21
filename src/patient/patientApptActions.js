import PATIENT_TYPES from "./patientApptTypes";

const getPatientApptData = (patient) => ( {
  patient: patient,
  type: PATIENT_TYPES.GET_APPT_DATA
} );

export default {
  getPatientApptData
};
