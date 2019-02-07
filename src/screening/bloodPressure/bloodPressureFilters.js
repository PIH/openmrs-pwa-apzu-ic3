import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES, ALERTS_CATEGORIES } from "../../constants";
import utils from '../../utils';

const bloodPressureFilter = patient => {
  return utils.hasAlert(patient.alert, [
    ALERTS_CATEGORIES.BP_ALERT,
    ALERTS_CATEGORIES.SCREENING_ELIGIBILITY_ALERT
  ]);
}

export default {
  required: bloodPressureFilter,
  completed: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.BloodPressureEncounterType.uuid, 'include'),
};

