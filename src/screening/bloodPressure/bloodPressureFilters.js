import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES } from "../../constants";

const ageFilter = patient => patient.age >= 18;   // only adults

export default {
  required: [patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.BloodPressureEncounterType.uuid, 'exclude'), ageFilter],
  completed: [patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.BloodPressureEncounterType.uuid, 'include')]
};

