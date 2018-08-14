import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES } from "../../constants";

const ageFilter = patient => patient.age > 18;   // only adults

export default [patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.CheckInEncounterType.uuid, 'include'),
  patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.BloodPressureEncounterType.uuid, 'exclude'), ageFilter];
