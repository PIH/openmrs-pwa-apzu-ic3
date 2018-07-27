import dateFns from 'date-fns';
import { ENCOUNTER_TYPES } from "./constants";

const utils = {

  formatTime: (datetime) => {
    return dateFns.format(new Date(datetime), 'h[:]mma');
  },

  getPatientCheckedInTime: (patient) => {

    let checkedInTime = null;
    if (typeof patient.activeVisit !== 'undefined' && typeof patient.activeVisit.encounters !== 'undefined') {
      //filter by CheckIn encounter
      let checkedInEncounters = patient.activeVisit.encounters.filter(encounter =>
        encounter.encounterType.uuid === ENCOUNTER_TYPES.CheckInEncounterType.uuid);

      if (checkedInEncounters.length >  0 ) {
        checkedInEncounters.sort(function (a, b) {
          return +new Date(a.encounterDatetime) - +new Date(b.encounterDatetime);
        });
        checkedInTime = utils.formatTime(checkedInEncounters[0].encounterDatetime);
      }
    }

    return checkedInTime;

  }
};

export default utils;
