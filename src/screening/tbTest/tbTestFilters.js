import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES } from "../../constants";

export default {
  // doing this puts this on the task list in optional, else it goes to the special list
  // what condition does a patient has to have determines where this should go to...
  // feedback ?
  required: patient => !patient,
  completed: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.TBTestEncounterType.uuid, 'include')
};
