import dateFns from 'date-fns';
import { ENCOUNTER_TYPES } from "./constants";

const utils = {

  getPatientCheckedInTime: (patient) => {

    let checkedInTime = null;
    if (typeof patient.encounters !== 'undefined') {
      //filter by CheckIn encounter
      let checkedInEncounters = patient.encounters.filter(encounter =>
        encounter.encounterType.uuid === ENCOUNTER_TYPES.CheckInEncounterType.uuid);

      if (checkedInEncounters.length >  0 ) {
        checkedInEncounters.sort(function (a, b) {
          return +new Date(a.encounterDatetime) - +new Date(b.encounterDatetime);
        });
        checkedInTime = dateFns.format(new Date(checkedInEncounters[0].encounterDatetime), 'D[-]MMM[-]YY H[:]mm');
      }
    }

    return checkedInTime;

  }
};


export default utils;