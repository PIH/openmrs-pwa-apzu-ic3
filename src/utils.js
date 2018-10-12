import dateFns from 'date-fns';
import { patientUtil } from '@openmrs/react-components';
import { ENCOUNTER_TYPES, IDENTIFIER_TYPES, CONCEPTS, MALNUTRITION_ALERT_COLORS } from "./constants";

const utils = {

  formatTime: (datetime) => {
    return dateFns.format(new Date(datetime), 'h[:]mma');
  },

  formatRestDate: (datetime) => {
    return dateFns.format(datetime, 'YYYY-MM-DDTHH:mm:ss.SSS');
  },
  formatCalendarDate: (datetime) => {
    return dateFns.format(datetime, 'MMMM D, YYYY');
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
    return patientUtil.getIdentifier(patient, IDENTIFIER_TYPES.ART_IDENTIFIER_TYPE);
  },
  getPatientEidIdentifier: (patient) => {
    return patientUtil.getIdentifier(patient, IDENTIFIER_TYPES.EID_IDENTIFIER_TYPE);
  },
  getPatientNcdIdentifier: (patient) => {
    return patientUtil.getIdentifier(patient, IDENTIFIER_TYPES.NCD_IDENTIFIER_TYPE);
  },
  getPatientIdentifiers: (patient) => {

    let identifiers = [];
    let id = utils.getPatientArtIdentifier(patient);
    if (id) {
      identifiers.push(id);
    }
    id = utils.getPatientEidIdentifier(patient);
    if (id) {
      identifiers.push(id);
    }
    id = utils.getPatientNcdIdentifier(patient);
    if (id) {
      identifiers.push(id);
    }
    if (identifiers.length > 0) {
      return identifiers.join('<br/>');
    } else {
      return null;
    }


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

  getLastLabTest: (labTests, type) => {
    let lastLabTest = null;
    if (labTests !== null ) {
      let filteredTests = labTests;
      if (typeof filteredTests !== 'undefined' && filteredTests !== null && typeof type !== 'undefined' && type !== null) {
        filteredTests = labTests.filter(test => type.indexOf(test.test_type) >=0 );

        if ( filteredTests.length > 0 ) {
          filteredTests.sort(function (a, b) {
            return +new Date(b.date_collected) - +new Date(a.date_collected);
          });
          lastLabTest = filteredTests[0];
        }
      }
    }

    return lastLabTest;
  },

  getAdherenceSessionNumber: (obs) => {
    let sessionNumber = null;
    obs.forEach(function(observation) {
      if (observation.concept.uuid === CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.uuid ) {
        switch(observation.value.uuid) {
          case CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.FirstSession.uuid:
            sessionNumber = CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.FirstSession.name;
            break;
          case CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.SecondSession.uuid:
            sessionNumber = CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.SecondSession.name;
            break;
          case CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.ThirdSession.uuid:
            sessionNumber = CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.ThirdSession.name;
            break;
          default:
            break;
        }
      }
    });
    return sessionNumber;
  },

  getAdherenceCounselor: (obs) => {
    let counselor = null;
    obs.forEach(function(observation)  {
      if (observation.concept.uuid === CONCEPTS.ADHERENCE_COUNSELING.NameOfCounselor.uuid ) {
        counselor = observation.value;
      }
    });
    return counselor;
  },
  
  getPatientCheckOutTime: (patient) => {

    let checkOutTime = null;
    if (typeof patient.visit !== 'undefined' && patient.visit.stopDatetime !== null) {
      checkOutTime = utils.formatTime(patient.visit.stopDatetime);
    }

    return checkOutTime;
  },

  calculateBMI: (weight, height) => {
    let bmi = null;
    if (weight !== null && height !== null ) {
      bmi = (( weight / ( height * height) ) * 10000).toFixed(1);
    }
    return bmi;
  },

  calculateBMIAlert: (bmi) => {
    let alert = MALNUTRITION_ALERT_COLORS.default;
    if ( bmi < 16) {
      alert = MALNUTRITION_ALERT_COLORS.severe;
    } else if ( bmi >= 16 && bmi < 18.4) {
      alert = MALNUTRITION_ALERT_COLORS.moderate;
    } else if ( bmi >=18.4 && bmi < 24.9) {
      alert = MALNUTRITION_ALERT_COLORS.normal;
    } else {
      alert = MALNUTRITION_ALERT_COLORS.overweight;
    }

    return alert;
  },

};

export default utils;
