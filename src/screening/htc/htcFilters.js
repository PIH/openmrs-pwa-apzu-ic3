import { patientObjByEncounterTypeFilter  } from "@openmrs/react-components";
import { ENCOUNTER_TYPES, HIV_TEST_TYPES } from "../../constants";
import utils from "../../utils";
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

/**
 Every patient 2 years old and older should be tested except:
 a. patient is 13 yo and older and had an HIV negative test in the last 3 months
 b. patient is younger than 13 years and had an HIV negative test in the last 12 months
 */

const helper = {
  isDueForHTC: (patient) => {
    if ( patient.age < 2) {
      return false;
    }
    let lastHtcTest = utils.getLastLabTest(patient.labTests, HIV_TEST_TYPES.hiv_test + "; " + HIV_TEST_TYPES.rapid_test);
    if ( lastHtcTest === null ) {
      // patient had no prior test and patient is older than 2yo
      return true;
    } else if (lastHtcTest.result_coded === 'Non-reactive' || lastHtcTest.result_coded === 'Negative'){
      let daysSinceLastTest = differenceInCalendarDays(new Date(), new Date(lastHtcTest.date_collected));
      if ( (patient.age >= 13 && daysSinceLastTest < 90) || (patient.age < 13 && daysSinceLastTest < 365)) {
        return false;
      } else {
        return true;
      }
    }

    return false;
  }
};


// only patients due for HTC
const htcFilter = patient => {
  return (( (typeof patient.actions !== 'undefined') && (patient.actions !== null) ) ? patient.actions.toLowerCase().includes('refer to htc') : false )
    || helper.isDueForHTC(patient);
};


export default {
  required: htcFilter,
  completed: patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.HTCEncounterType.uuid, 'include')
};
