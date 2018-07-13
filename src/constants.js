
// TODO: this will be refactored out into an external config at some point
// TODO have the actually correct uuids once we create the encounter types!

export const PATIENT_REPRESENTATION = '(uuid,id,display,identifiers:(uuid,identifier,identifierType:(uuid),preferred),person:(uuid,display,gender,age,birthdate,birthdateEstimated,dead,deathDate,causeOfDeath,names,preferredName,addresses,attributes))';
export const ENCOUNTER_REPRESENTATION = '(id,uuid,encounterDatetime,location:(id,uuid,name),encounterType:(id,uuid,name))';

export const ENCOUNTER_TYPES = {
  'BloodPressureEncounterType': {
    uuid: '4fb47712-34a6-40d2-8ed3-e153abbd25b7'  // TODO: change to proper uuid!
  },
  'NutritionEncounterType': {
    uuid: '92fd09b4-5335-4f7e-9f63-b2a663fd09a6'  // TODO: change to proper uuid!
  },
  'CheckInEncounterType': {
    uuid: '55a0d3ea-a4d7-4e88-8f01-5aceb2d3c61b'
  }
};

export const VISIT_TYPES = {
  'ClinicVisitType': {
    uuid: 'f01c54cb-2225-471a-9cd5-d348552c337c'
  }
};

export const LOCATION_TYPES = {
  'UnknownLocation': {
    uuid: '8d6c993e-c2cc-11de-8d13-0010c6dffd0f'
  }
};
