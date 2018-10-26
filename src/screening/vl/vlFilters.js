import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES } from "../../constants";

// only patients due for VL test
/*
A. Routine Viral Load:
- Alert = 'Due for routine VL'
- Action= 'Needs routine VL'

B. Viral Load Re-test
- Alert = 'High VL'
- Action= 'Consider confirmatory VL'
 */
const vlFilter = patient => {
  return ( (typeof patient.actions !== 'undefined') && (patient.actions !== null) ) ? (patient.actions.toLowerCase().includes('needs routine vl') || patient.actions.toLowerCase().includes('confirmatory vl')) : false;
};


export default {
  expected: [patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.CheckInEncounterType.uuid, 'exclude'), vlFilter],
  required: [patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.VLEncounterType.uuid, 'exclude'), vlFilter],
  completed: [patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.VLEncounterType.uuid, 'include')]
};
