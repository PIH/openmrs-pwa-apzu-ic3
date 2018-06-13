
import createQueueReducer from "../../queue/createQueueReducer";
import { ENCOUNTER_TYPES } from "../../constants";

export default createQueueReducer(ENCOUNTER_TYPES.NutritionEncounterType.uuid);
