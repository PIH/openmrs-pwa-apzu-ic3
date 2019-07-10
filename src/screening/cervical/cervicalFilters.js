import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES, ALERTS_CATEGORIES } from "../../constants";
import utils from "../../utils";


/**
 Every female between the age pf 15 and 49 years old should be tested:
 a. every past 3 years if patient is HIV-negative
 b. every past 1 year of patient is HIV-positive
 */

// only patients due for Cervical Cancer Screening
const cervicalFilter = patient => {
  return utils.hasAlert(patient.alert, [
    ALERTS_CATEGORIES.CERVICAL_ALERT,
    ALERTS_CATEGORIES.SCREENING_ELIGIBILITY_ALERT
  ]);
};


export default {
  required: cervicalFilter,
  completed: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.CervicalCancerScreeningEncounterType.uuid, 'include')
};
