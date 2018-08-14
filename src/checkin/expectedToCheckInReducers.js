import { createListReducer } from "@openmrs/react-components";
import CHECK_IN_TYPES from "./checkInTypes";

// TODO remove?

export default createListReducer(CHECK_IN_TYPES.CHECK_IN.EXPECTED_TO_CHECK_IN,
  'patients',
  [],
  []);
