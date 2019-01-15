import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES } from "../../constants";

export default {
  required: patient => false,
  completed: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.TBTestEncounterType.uuid, 'include')
};
