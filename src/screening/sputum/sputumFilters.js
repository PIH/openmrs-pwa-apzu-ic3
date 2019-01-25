import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES, SPUTUM_ALERTS_CATEGORIES } from "../../constants";
import utils from "../../utils";

const sputumFilter = patient => {
  return utils.hasAlert(patient.alert, SPUTUM_ALERTS_CATEGORIES);
};

export default {
  required: sputumFilter,
  completed: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.TBSputumSubmitted.uuid, 'include'),
};
