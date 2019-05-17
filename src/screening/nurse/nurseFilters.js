import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES } from "../../constants";


export default {
  required: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.NurseEvaluationEncounterType.uuid, 'exclude'),
  completed: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.NurseEvaluationEncounterType.uuid, 'include')
};
