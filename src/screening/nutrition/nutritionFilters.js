import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES } from "../../constants";

// TODO add filter for checked-in

export default [patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.NutritionEncounterType.uuid)];
