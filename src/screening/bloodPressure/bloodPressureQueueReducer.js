import { VISIT_TYPES, createListReducer, visitRestRepToPatientObjConverter, patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES } from "../../constants";

const ageFilter = patient => patient.age > 18;   // only adults

// TODO remove this and fix the tests

export default createListReducer(VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
  'visits',
  [visitRestRepToPatientObjConverter()],
  [patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.BloodPressureEncounterType.uuid), ageFilter]);
