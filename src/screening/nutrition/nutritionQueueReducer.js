
import createQueueReducer from "../createQueueReducer";

// TODO fix to use proper encounter type, import from elsewhere?
const NUTRITION_ENCOUNTER_TYPE = '4fb47712-34a6-40d2-8ed3-e153abbd25b7';

export default createQueueReducer(NUTRITION_ENCOUNTER_TYPE);
