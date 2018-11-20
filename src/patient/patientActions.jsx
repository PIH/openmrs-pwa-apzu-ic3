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

export default {
  getIC3Patients,
  getIC3PatientsFailed
};
