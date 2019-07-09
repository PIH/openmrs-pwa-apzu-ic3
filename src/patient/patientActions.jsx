import PATIENT_TYPES from './patientTypes';

const getIC3Patients = (location, endDate, loadExpectedAppointments = false) => ({
  type: PATIENT_TYPES.GET_IC3_PATIENTS,
  location: location,
  endDate: endDate,
  loadExpectedAppointments: loadExpectedAppointments
});

const getIC3PatientsFailed = (message) => ({
  type: PATIENT_TYPES.GET_IC3_PATIENTS_FAILED,
  message: message
});

// if a value is passed in for "formInstanceId", that form will be set back to "VIEW" mode after the patient data is fetched
// this is a bit of a hack so that form submission is not "complete" until the alerts have been updated, see: https://pihemr.atlassian.net/browse/IS-484
const getIC3PatientScreeningData = (patient, formInstanceId) => ({
  patient: patient,
  formInstanceId: formInstanceId,
  type: PATIENT_TYPES.GET_IC3_PATIENT_SCREENING_DATA
});

const getIC3PatientScreeningDataFailed = (message) => ({
  message: message,
  type: PATIENT_TYPES.GET_IC3_PATIENT_SCREENING_DATA_FAILED
});

const getIC3PatientNutritionHistory = (patient) => ({
  type: PATIENT_TYPES.GET_NUTRITION_HISTORY,
  patient,
});

export default {
  getIC3Patients,
  getIC3PatientsFailed,
  getIC3PatientScreeningData,
  getIC3PatientScreeningDataFailed,
  getIC3PatientNutritionHistory,
};
