import { VISIT_TYPES } from "@openmrs/react-components";
import visitRestRepToPatientObjConverter from '../list/converter/visitRestRepToPatientObjConverter';
import createListReducer from "../list/createListReducer";


export default createListReducer(VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
  'visits',
  [visitRestRepToPatientObjConverter()],
  []);
