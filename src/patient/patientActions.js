import PATIENT_TYPES from "./patientTypes";

const clearPatientSelected = () => ( {
  type: PATIENT_TYPES.CLEAR_SELECTED
} );

export default {
  clearPatientSelected
};
