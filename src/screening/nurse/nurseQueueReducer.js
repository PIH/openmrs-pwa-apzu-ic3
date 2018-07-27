import { VISIT_TYPES, createListReducer, visitRestRepToPatientObjConverter, patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES } from "../../constants";


export default createListReducer(VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
  'visits',
  [visitRestRepToPatientObjConverter()],
  [patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.NurseEvalationEncounterType.uuid)]);


