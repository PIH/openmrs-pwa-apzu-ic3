import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ALERTS_CATEGORIES, ENCOUNTER_TYPES } from "../../constants";
import utils from "../../utils";

const nurseFilter = patient => {
  return utils.hasAlert(patient.alert, [
    ALERTS_CATEGORIES.NURSE_ALERT,
    ALERTS_CATEGORIES.SCREENING_ELIGIBILITY_ALERT
  ]);
};

export default {
  required: nurseFilter,
  completed: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.NurseEvaluationEncounterType.uuid, 'include')
};
