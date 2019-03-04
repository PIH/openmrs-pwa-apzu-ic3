import {patientObjByEncounterTypeFilter} from "@openmrs/react-components";
import {ENCOUNTER_TYPES, ALERTS_CATEGORIES} from "../../constants";
import utils from "../../utils";

const tbTestFilter = patient => {
  return utils.hasAlert(patient.alert, [
    ALERTS_CATEGORIES.SPUTUM_ALERT,
    ALERTS_CATEGORIES.SCREENING_ELIGIBILITY_ALERT
  ]);
};

export default {
  required: tbTestFilter,
  completed: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.TBTestResults.uuid, 'include'),
};
