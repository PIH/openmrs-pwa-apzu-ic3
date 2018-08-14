import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES } from "../../constants";

const ageFilter = patient => patient.age > 18;   // only adults

// TODO add filter for checked-in

export default [patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.BloodPressureEncounterType.uuid), ageFilter];
