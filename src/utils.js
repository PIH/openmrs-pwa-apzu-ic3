import dateFns from 'date-fns';
import { ENCOUNTER_TYPES, IDENTIFIER_TYPES } from "./constants";

const utils = {

  formatTime: (datetime) => {
    return dateFns.format(new Date(datetime), 'h[:]mma');
  },

  formatRestDate: (datetime) => {
    return dateFns.format(datetime, 'YYYY-MM-DDTHH:mm:ss.SSS');
  },

  formatReportRestDate: (datetime) => {
    return dateFns.format(datetime, 'YYYY-MM-DD');
  },
  getTodaysDate: () => {
    return dateFns.format(new Date(), 'YYYY-MM-DD');
  },

  getEndOfYesterday: () => {
    return utils.formatRestDate(dateFns.endOfYesterday());
  },

  getPatientArtIdentifier: (patient) => {

    let artId = null;
    if (typeof patient.identifiers !== 'undefined') {
      if (typeof patient.identifiers.artNumber !== 'undefined') {
        artId = patient.identifiers.artNumber;
      } else {
        let artIdentifier = patient.identifiers.find( identifier => identifier.identifierType === IDENTIFIER_TYPES.ART_IDENTIFIER_TYPE.uuid);
        if (typeof artIdentifier !== 'undefined' && artIdentifier !== null) {
          artId = artIdentifier.identifier;
        }
      }
    }

    return artId;

  },
  getPatientEidIdentifier: (patient) => {

    let eidId = null;
    if (typeof patient.identifiers !== 'undefined') {
      if (typeof patient.identifiers.eidNumber !== 'undefined') {
        eidId = patient.identifiers.eidNumber;
      } else {
        let eidIdentifier = patient.identifiers.find( identifier => identifier.identifierType === IDENTIFIER_TYPES.EID_IDENTIFIER_TYPE.uuid);
        if (typeof eidIdentifier !== 'undefined' && eidIdentifier !== null) {
          eidId = eidIdentifier.identifier;
        }
      }
    }

    return eidId;

  },
  getPatientNcdIdentifier: (patient) => {

    let ncdId = null;
    if (typeof patient.identifiers !== 'undefined') {
      if (typeof patient.identifiers.ncdNumber !== 'undefined') {
        ncdId = patient.identifiers.ncdNumber;
      } else {
        let ncdIdentifier = patient.identifiers.find( identifier => identifier.identifierType === IDENTIFIER_TYPES.NCD_IDENTIFIER_TYPE.uuid);
        if (typeof ncdIdentifier !== 'undefined' && ncdIdentifier !== null) {
          ncdId = ncdIdentifier.identifier;
        }
      }
    }

    return ncdId;

  },
  getPatientCheckedInTime: (patient) => {

    let checkedInTime = null;
    if (typeof patient.visit !== 'undefined' && typeof patient.visit.encounters !== 'undefined') {
      //filter by CheckIn encounter
      let checkedInEncounters = patient.visit.encounters.filter(encounter =>
        encounter.encounterType.uuid === ENCOUNTER_TYPES.CheckInEncounterType.uuid);

      if (checkedInEncounters.length >  0 ) {
        checkedInEncounters.sort(function (a, b) {
          return +new Date(a.encounterDatetime) - +new Date(b.encounterDatetime);
        });
        checkedInTime = utils.formatTime(checkedInEncounters[0].encounterDatetime);
      }
    }

    return checkedInTime;

  },

  getPatientCheckOutTime: (patient) => {

    let checkOutTime = null;
    if (typeof patient.visit !== 'undefined' && patient.visit.stopDatetime !== null) {
      checkOutTime = utils.formatTime(patient.visit.stopDatetime);
    }

    return checkOutTime;
  },

};

export default utils;
