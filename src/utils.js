import dateFns from 'date-fns';
import {
  ENCOUNTER_TYPES, CONCEPTS, MALNUTRITION_LEVEL, EID_RAPID_TEST,
  EID_DNA_PCR
} from "./constants";
import patientUtil from "@openmrs/react-components/src/domain/patient/patientUtil";

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

  /* getPatientArtIdentifier: (patient) => {
     return patientUtil.getIdentifier(patient, IDENTIFIER_TYPES.ART_IDENTIFIER_TYPE);
   },
   getPatientEidIdentifier: (patient) => {
     return patientUtil.getIdentifier(patient, IDENTIFIER_TYPES.EID_IDENTIFIER_TYPE);
   },
   getPatientNcdIdentifier: (patient) => {
     return patientUtil.getIdentifier(patient, IDENTIFIER_TYPES.NCD_IDENTIFIER_TYPE);
   },*/
  getPatientIdentifiers: (patient) => {

    const identifiers = patientUtil.getIdentifiers(patient);

    if (identifiers.length > 0) {
      return identifiers.join('<br/>');
    } else {
      return null;
    }


  },
  getPatientCheckedInEncounter: (patient) => {

    let checkedInEncounter = null;
    if (typeof patient.visit !== 'undefined' && typeof patient.visit.encounters !== 'undefined') {
      //filter by CheckIn encounter
      let checkedInEncounters = patient.visit.encounters.filter(encounter =>
        encounter.encounterType.uuid === ENCOUNTER_TYPES.CheckInEncounterType.uuid);

      if (checkedInEncounters.length >  0 ) {
        checkedInEncounters.sort(function (a, b) {
          return +new Date(a.encounterDatetime) - +new Date(b.encounterDatetime);
        });
        checkedInEncounter = checkedInEncounters[0];
      }
    }

    return checkedInEncounter;

  },
  getPatientCheckedInTime: (patient) => {
    return utils.getPatientCheckedInEncounter(patient) !== null ? utils.formatTime((utils.getPatientCheckedInEncounter(patient)).encounterDatetime) : null;
  },

  getPatientCheckedInDate: (patient) => {
    return utils.getPatientCheckedInEncounter(patient) !== null ? utils.formatReportRestDate((utils.getPatientCheckedInEncounter(patient)).encounterDatetime) : null;
  },

  getLastLabTest: (labTests) => {
    let lastLabTest = null;
    if (labTests !== null ) {
      let filteredTests = labTests;
      if (typeof filteredTests !== 'undefined' && filteredTests !== null ) {

        if ( filteredTests.length > 0 ) {
          filteredTests.sort(function (a, b) {
            return +new Date(b.resultDate) - +new Date(a.resultDate);
          });
          lastLabTest = filteredTests[0];
        }
      }
    }

    return lastLabTest;
  },

  findByUuid: (o, uuid) => {
      //early return
    if (o.uuid === uuid) {
      return o;
    }

    let result, p;
    for (p in  o) {
      if ( o.hasOwnProperty(p) && typeof o[p] === 'object') {
        result = utils.findByUuid(o[p], uuid);
        if(result) {
          return result;
        }
      }
    }
    return result;
  },

  getConceptNameByUuid: (uuid) => {
    let conceptName = null;
    if (uuid) {
      let conceptObj = utils.findByUuid(CONCEPTS, uuid);
      if (conceptObj) {
        conceptName = conceptObj.name;
      }
    }
    return conceptName;
  },

  getDefaultEidTestType: (patient) => {

    let eidForm = null;
    if ( (typeof patient.alert !== 'undefined') && (patient.alert !== null) &&  ( Object.keys(patient.alert).length > 0 )) {
      let alertsArray = Object.keys(patient.alert);
      for (let i = 0; i < alertsArray.length; i++) {
        let a = alertsArray[i];
        if ( EID_RAPID_TEST.indexOf(a) >= 0 ) {
          return CONCEPTS.HIV_RAPID_TEST.uuid;
        } else if ( EID_DNA_PCR.indexOf(a) >= 0 ) {
          return CONCEPTS.HIV_DNA_PCR_TEST.uuid;
        }
      }
    }

    return eidForm;
  },

  hasAlert: (alerts, category) => {
    if ((typeof alerts === 'undefined') ||
      (alerts === null) ||
      ( Object.keys(alerts).length < 1)) {
      return false;
    }
    let retValue = false;
    let alertsArray = Object.keys(alerts);
    for (let i = 0; i < alertsArray.length; i++) {
      retValue = (alerts[alertsArray[i]]).some(a => category.indexOf(a) >= 0);
      if ( retValue === true) {
        break;
      }
    }
   return retValue;
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
    let alert = MALNUTRITION_LEVEL.default;
    if ( bmi < 16) {
      alert = MALNUTRITION_LEVEL.severe;
    } else if ( bmi >= 16 && bmi < 18.4) {
      alert = MALNUTRITION_LEVEL.moderate;
    } else if ( bmi >=18.4 && bmi < 24.9) {
      alert = MALNUTRITION_LEVEL.normal;
    } else {
      alert = MALNUTRITION_LEVEL.overweight;
    }

    return alert;
  },

  calculateMalnutritionLevel: (bmi,muac, age, pregnant) => {
    let level = null;
    if (typeof bmi !== 'undefined' && bmi !== null && age > 18 && (typeof pregnant === 'undefined' || (typeof pregnant !== 'undefined' && pregnant === CONCEPTS.False.uuid))) {
      //all adults above 18 years excluding pregnant females
      return utils.calculateBMIAlert(bmi);
    } else if (typeof muac !== 'undefined' && muac !== null && age !== null) {
      level = MALNUTRITION_LEVEL.normal;
      switch (true) {
        case (age < 5 ): //MUAC cut-offs: 6-59 months <11.5cm severe and 11.5-12.5 moderate
          if (muac < 11.5) {
            level = MALNUTRITION_LEVEL.severe;
          } else if ( muac < 12.5 ) {
            level = MALNUTRITION_LEVEL.moderate;
          }
          break;
        case (age < 10): //MUAC cut-offs: 5-9 years <13cm severe and 13-14.5 moderate
          if (muac < 13) {
            level = MALNUTRITION_LEVEL.severe;
          } else if ( muac < 14.5 ) {
            level = MALNUTRITION_LEVEL.moderate;
          }
          break;
        case (age < 15): //MUAC cut-offs: 10-14 years <16cm severe and 16-18.5 moderate
          if (muac < 16) {
            level = MALNUTRITION_LEVEL.severe;
          } else if ( muac < 18.5 ) {
            level = MALNUTRITION_LEVEL.moderate;
          }
          break;
        case (age < 18): //MUAC cut-offs: 15-18 years <18.5cm severe and 18.5-21.9cm moderate
          if (muac < 18.5) {
            level = MALNUTRITION_LEVEL.severe;
          } else if ( muac < 21.9 ) {
            level = MALNUTRITION_LEVEL.moderate;
          }
          break;
        case (age >= 18): //MUAC cut-offs: pregnant mothers  <19cm severe and 19-21.9 moderate
          if ( typeof pregnant !== 'undefined' && pregnant === CONCEPTS.True.uuid ){
            if (muac < 19) {
              level = MALNUTRITION_LEVEL.severe;
            } else if ( muac < 22) {
              level = MALNUTRITION_LEVEL.moderate;
            }
          }
          break;
        default:
          break;
      }
    }
    return level;
  }

};

export default utils;
