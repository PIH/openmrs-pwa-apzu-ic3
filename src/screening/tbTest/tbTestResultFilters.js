import { patientObjByEncounterTypeAndObsFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES, CONCEPTS } from "../../constants";

export default {
  required: patient => false,
  completed: patientObjByEncounterTypeAndObsFilter(
    ENCOUNTER_TYPES.TBTestResults.uuid,
    [ CONCEPTS.TBTestType.uuid ],
    'include')
};
