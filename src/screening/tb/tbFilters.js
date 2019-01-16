import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES } from "../../constants";

export default {
  required: patient => true,
  completed: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.TBScreeningEncounterType.uuid, 'include')
};
