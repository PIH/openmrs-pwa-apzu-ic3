import createQueueReducer from "../../queue/createQueueReducer";
import { ENCOUNTER_TYPES } from "../../constants";

const filters = [

];

export default createQueueReducer(ENCOUNTER_TYPES.NurseEvalationEncounterType.uuid, filters);
