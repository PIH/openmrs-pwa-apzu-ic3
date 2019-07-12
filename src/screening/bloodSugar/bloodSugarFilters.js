import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES, ALERTS_CATEGORIES } from "../../constants";
import utils from "../../utils";


const bloodSugarFilters = patient => {
  return utils.hasAlert(patient.alert, [
    ALERTS_CATEGORIES.DIABETES_ALERT,
    ALERTS_CATEGORIES.SCREENING_ELIGIBILITY_ALERT
  ]);
};


export default {
  required: bloodSugarFilters,
  completed: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.BloodSugarScreeningEncounterType.uuid, 'include'),
  notCompleted: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.BloodSugarScreeningEncounterType.uuid, 'exclude')
};
