import createQueueReducer from "../../queue/createQueueReducer";
import { ENCOUNTER_TYPES } from "../../constants";

const filters = [
  visit => visit.patient.age > 18    // only adults
];

export default createQueueReducer(ENCOUNTER_TYPES.BloodPressureEncounterType.uuid, filters);
