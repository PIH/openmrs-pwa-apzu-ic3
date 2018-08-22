import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES } from "../../constants";

// only patients due for HTC
const htcFilter = patient => {
  return ( (typeof patient.actions !== 'undefined') && (patient.actions !== null) ) ? patient.actions.toLowerCase().includes('refer to htc') : false;
};


export default {
  required: [patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.HTCEncounterType.uuid, 'exclude'), htcFilter],
  completed: [patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.HTCEncounterType.uuid, 'include')]
};
