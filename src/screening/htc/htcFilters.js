import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES, ALERTS_CATEGORIES } from "../../constants";
import utils from "../../utils";


/**
 Every patient 2 years old and older should be tested except:
 a. patient is 13 yo and older and had an HIV negative test in the last 3 months
 b. patient is younger than 13 years and had an HIV negative test in the last 12 months
 */

// only patients due for HTC
const htcFilter = patient => {
  return utils.hasAlert(patient.alert, [
    ALERTS_CATEGORIES.HTC_ALERT,
    ALERTS_CATEGORIES.SCREENING_ELIGIBILITY_ALERT
  ]);
};


export default {
  required: htcFilter,
  completed: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.HTCEncounterType.uuid, 'include')
};
