import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES, ALERTS_CATEGORIES } from "../../constants";
import utils from "../../utils";


const labStationFilters = patient => {
  return utils.hasAlert(patient.alert, [
    ALERTS_CATEGORIES.LAB_STATION_ALERT,
    ALERTS_CATEGORIES.SCREENING_ELIGIBILITY_ALERT
  ]);
};


export default {
  required: labStationFilters,
  completed: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.LabStationResultsEncounterType.uuid, 'include'),
  notCompleted: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.LabStationResultsEncounterType.uuid, 'exclude')
};
