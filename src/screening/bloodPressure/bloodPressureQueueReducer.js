import createQueueReducer from "../../queue/createQueueReducer";

// TODO fix to use proper encounter type, import from elsewhere?
const BLOOD_PRESSURE_ENCOUNTER_TYPE = '4fb47712-34a6-40d2-8ed3-e153abbd25b7';

const filters = [
  visit => visit.patient.person.age > 18    // only adults
];

export default createQueueReducer(BLOOD_PRESSURE_ENCOUNTER_TYPE, filters);
