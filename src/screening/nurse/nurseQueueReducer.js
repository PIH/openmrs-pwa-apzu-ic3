import { VISIT_TYPES } from "@openmrs/react-components";
import visitRestRepToPatientObjConverter from '../../list/converter/visitRestRepToPatientObjConverter';
import byEncounterTypeFilter from '../../list/filter/byEncounterTypeFilter';
import createListReducer from "../../list/createListReducer";
import { ENCOUNTER_TYPES } from "../../constants";


export default createListReducer(VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
  'visits',
  [visitRestRepToPatientObjConverter()],
  [byEncounterTypeFilter(ENCOUNTER_TYPES.NurseEvalationEncounterType.uuid)]);


