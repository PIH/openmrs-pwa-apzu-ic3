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

const getIC3PatientScreeningData = (patient) => ({
  patient: patient,
  type: PATIENT_TYPES.GET_IC3_PATIENT_SCREENING_DATA
});

const getIC3PatientScreeningDataFailed = (message) => ({
  message: message,
  type: PATIENT_TYPES.GET_IC3_PATIENT_SCREENING_DATA_FAILED
});

export default {
  getIC3Patients,
  getIC3PatientsFailed,
  getIC3PatientScreeningData,
  getIC3PatientScreeningDataFailed
};
