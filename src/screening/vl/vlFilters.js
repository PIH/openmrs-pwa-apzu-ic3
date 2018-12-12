import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES, VIRAL_LOAD_ALERTS } from "../../constants";

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
  return ( ((typeof patient.alert !== 'undefined') && (patient.alert !== null)) ? patient.alert.some(a => VIRAL_LOAD_ALERTS.indexOf(a) >= 0) : false );
};


export default {
  expected: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.CheckInEncounterType.uuid, 'exclude'),
  required: vlFilter,
  completed: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.VLEncounterType.uuid, 'include'),
};
