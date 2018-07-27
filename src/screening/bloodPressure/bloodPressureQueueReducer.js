import visitRestRepToPatientObjConverter from '../../list/converter/visitRestRepToPatientObjConverter';
import byEncounterTypeFilter from '../../list/filter/byEncounterTypeFilter';
import createListReducer from "../../list/createListReducer";
import { ENCOUNTER_TYPES } from "../../constants";
import { VISIT_TYPES } from "@openmrs/react-components";

const ageFilter = patient => patient.age > 18;   // only adults

export default createListReducer(VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
  'visits',
  [visitRestRepToPatientObjConverter()],
  [byEncounterTypeFilter(ENCOUNTER_TYPES.BloodPressureEncounterType.uuid), ageFilter]);
