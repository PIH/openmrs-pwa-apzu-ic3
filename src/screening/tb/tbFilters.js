import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES, ALERTS_CATEGORIES } from "../../constants";
import utils from "../../utils";


const tbFilter = patient => {
  return utils.hasAlert(patient.alert, [
    ALERTS_CATEGORIES.TB_ALERT,
    ALERTS_CATEGORIES.SCREENING_ELIGIBILITY_ALERT
  ]);
};

export default {
  required: tbFilter,
  completed: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.TBScreeningEncounterType.uuid, 'include')
};
