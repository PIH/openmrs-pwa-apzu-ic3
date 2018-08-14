import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES } from "../../constants";

export default [patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.CheckInEncounterType.uuid, 'include'),
  patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.NutritionEncounterType.uuid, 'exclude')];

