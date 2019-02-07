import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES, BP_ALERTS_CATEGORIES } from "../../constants";
import utils from '../../utils';

const bloodPressureFilter = patient => {
  return utils.hasAlert(patient.alert, BP_ALERTS_CATEGORIES)
}

export default {
  required: bloodPressureFilter,
  completed: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.BloodPressureEncounterType.uuid, 'include'),
};

