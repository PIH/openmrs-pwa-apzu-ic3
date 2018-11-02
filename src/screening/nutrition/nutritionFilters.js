import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES } from "../../constants";

export default {
  required: patient => patient,
  completed: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.NutritionEncounterType.uuid, 'include')
};
