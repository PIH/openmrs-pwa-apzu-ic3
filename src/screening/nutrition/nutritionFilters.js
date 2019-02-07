import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES, NUTRITION_ALERTS_CATEGORIES } from "../../constants";
import utils from "../../utils";

const nutritionFilter = patient => {
  return utils.hasAlert(patient.alert, NUTRITION_ALERTS_CATEGORIES);
};

export default {
  required: nutritionFilter,
  completed: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.NutritionEncounterType.uuid, 'include')
};
