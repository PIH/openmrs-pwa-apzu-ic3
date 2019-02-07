import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES, ALERTS_CATEGORIES } from "../../constants";
import utils from "../../utils";

const nutritionFilter = patient => {
  return utils.hasAlert(patient.alert, [
    ALERTS_CATEGORIES.NUTRITION_ALERT,
    ALERTS_CATEGORIES.SCREENING_ELIGIBILITY_ALERT
  ]);
};

export default {
  required: nutritionFilter,
  completed: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.NutritionEncounterType.uuid, 'include')
};
