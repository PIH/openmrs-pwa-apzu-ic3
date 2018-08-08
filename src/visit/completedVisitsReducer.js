import { VISIT_TYPES, visitRestRepToPatientObjConverter, createListReducer } from "@openmrs/react-components";

export default createListReducer(VISIT_TYPES.INACTIVE_VISITS.FETCH_SUCCEEDED,
  'visits',
  [visitRestRepToPatientObjConverter()],
  []);
