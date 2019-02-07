import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES, TB_ALERTS_CATEGORIES } from "../../constants";
import utils from "../../utils";


const tbFilter = patient => {
  return utils.hasAlert(patient.alert, TB_ALERTS_CATEGORIES);
};

export default {
  required: tbFilter,
  completed: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.TBScreeningEncounterType.uuid, 'include')
};
