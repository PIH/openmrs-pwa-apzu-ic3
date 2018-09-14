// TODO: rename to "config.js"?
// TODO: this will be refactored out into an external config at some point

export const PATIENT_REPRESENTATION = '(uuid,id,display,identifiers:(uuid,identifier,identifierType:(uuid),preferred),person:(uuid,display,gender,age,birthdate,birthdateEstimated,dead,deathDate,causeOfDeath,names,preferredName,addresses,attributes))';
export const ENCOUNTER_REPRESENTATION = '(id,uuid,encounterDatetime,location:(id,uuid,name),encounterType:(id,uuid,name),obs:(id,uuid,value,concept,comment,display))';
export const VISIT_REPRESENTATION = '(uuid,location:(uuid,display,name),startDatetime,stopDatetime,patient:' + PATIENT_REPRESENTATION + ',encounters:' + ENCOUNTER_REPRESENTATION + ')';

export const ENCOUNTER_TYPES = {
  'BloodPressureEncounterType': {
    uuid: '0C36F6FB-660E-485F-AF04-249579C9EAC9'  // is added to the pihmalawi EncounterTypes
  },
  'NutritionEncounterType': {
    uuid: '6265F6BC-EBC0-4181-91F3-28B70BBFDB61'  // is added to the pihmalawi EncounterTypes
  },
  'CheckInEncounterType': {
    uuid: '55a0d3ea-a4d7-4e88-8f01-5aceb2d3c61b'
  },
  'NurseEvaluationEncounterType': {
    uuid: '1e2f8be8-8ae3-41f1-b908-84f168f26325'
  },
  'HTCEncounterType': {
    uuid: '5B7238C1-23C6-4214-957F-7912A5BE87A9'
  },
  'VLEncounterType': {
    uuid: '9959A261-2122-4AE1-A89D-1CA444B712EA'
  },
  'DnaPcrEncounterType': {
    uuid: '8383DE35-5145-4953-A018-34876B797F3E'
  },
};


export const VISIT_TYPES = {
  'ClinicVisitType': {
    uuid: 'f01c54cb-2225-471a-9cd5-d348552c337c'
  }
};

export const IDENTIFIER_TYPES = {
  'ART_IDENTIFIER_TYPE': {
    uuid: '66784d84-977f-11e1-8993-905e29aff6c1'
  },
  'EID_IDENTIFIER_TYPE': {
    uuid: '66786256-977f-11e1-8993-905e29aff6c1'
  },
  'NCD_IDENTIFIER_TYPE': {
    uuid: '11a76c3e-1db8-4d16-9252-9a18b5ed1843'
  }
};

export const LOCATION_TYPES = {
  'UnknownLocation': {
    uuid: '8d6c993e-c2cc-11de-8d13-0010c6dffd0f'
  }
};

export const CONCEPTS = {
  'SystolicBloodPressure' : {
    uuid: '6569bffe-977f-11e1-8993-905e29aff6c1'
  },
  'DiastolicBloodPressure' : {
    uuid: '6569c116-977f-11e1-8993-905e29aff6c1'
  },
  'Height': {
    uuid: '6569c562-977f-11e1-8993-905e29aff6c1'
  },
  'Weight': {
    uuid: '6569c44a-977f-11e1-8993-905e29aff6c1'
  },
  'HTC_RESULTS': {
    uuid: '654b983a-977f-11e1-8993-905e29aff6c1',
    'Reactive': {
      uuid: '6549be7a-977f-11e1-8993-905e29aff6c1',
      name: 'Reactive'
    },
    'Non_Reactive': {
      uuid: '654994c2-977f-11e1-8993-905e29aff6c1',
      name: 'Non-Reactive'
    },
    'Not_Done': {
      uuid: '6557a4ae-977f-11e1-8993-905e29aff6c1',
      name: 'Not performed today'
    }
  },
  'VIRAL_LOAD_TEST_SET': {
    uuid: '83931c6d-0e5a-4302-b8ce-a31175b6475e',
    'Bled': {
      uuid: 'f792f2f9-9c24-4d6e-98fd-caffa8f2383f',
      name: 'Bled'
    },
    'True': {
      uuid: '655e2f90-977f-11e1-8993-905e29aff6c1',
      name: 'Yes'
    },
    'False': {
      uuid: '655e3148-977f-11e1-8993-905e29aff6c1',
      name: 'No'
    },
    'ReasonForNoSample': {
      uuid: '0e447d92-a180-11e8-98d0-529269fb1459',
      name: 'Reason for no sample'
    },
    'UnableToDrawBlood': {
      uuid: '0e447720-a180-11e8-98d0-529269fb1459',
      name: 'Unable to draw blood'
    },
    'PatientRefused': {
      uuid: '6566a4ae-977f-11e1-8993-905e29aff6c1',
      name: 'Patient refused'
    },
    'InadequateSupplies': {
      uuid: '655dc866-977f-11e1-8993-905e29aff6c1',
      name: 'Inadequate supplies for testing'
    },
    'NeedsAdherenceCounseling': {
      uuid: 'bc7bd9f2-b21d-11e8-96f8-529269fb1459',
      name: 'Needs additional adherence counseling'
    },
    'ReasonForTesting': {
      uuid: '164126AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      name: 'Reason for testing'
    },
    'Routine': {
      uuid: 'e0821812-955d-11e7-abc4-cec278b6b50a',
      name: 'Routine'
    },
    'SixWeeksRoutine': {
      uuid: 'e0821812-955d-11e7-abc4-cec278b6b50a',
      name: '6w Routine'
    },
    'Confirmatory': {
      uuid: '65590f06-977f-11e1-8993-905e29aff6c1',
      name: 'Confirmatory'
    },
    'Target': {
      uuid: 'e0821df8-955d-11e7-abc4-cec278b6b50a',
      name: 'Target'
    },
    'LabLocation': {
      uuid: '6fc0ab50-9492-11e7-abc4-cec278b6b50a',
      name: 'Lab Location'
    },
    'NenoGeneXpert': {
      uuid: 'e08214c0-955d-11e7-abc4-cec278b6b50a',
      name: 'Neno GeneXpert'
    },
    'CentralLaboratory': {
      uuid: 'e0820552-955d-11e7-abc4-cec278b6b50a',
      name: 'Central Laboratory'
    },
    'LisungwiGeneXpert': {
      uuid: 'e08212b8-955d-11e7-abc4-cec278b6b50a',
      name: 'Lisungwi GeneXpert'
    }
  },
  'SOURCE_OF_REFERRAL' : {
    uuid: '65664fc2-977f-11e1-8993-905e29aff6c1',
    'SHARC': {
      uuid: '6f48dfac-9ffa-11e8-98d0-529269fb1459',
      name: 'SHARC'
    },
    'OPD_at_health_center': {
      uuid: '655ac68e-977f-11e1-8993-905e29aff6c1',
      name: 'OPD at health center'
    },
    'Inpatient': {
      uuid: '655d1772-977f-11e1-8993-905e29aff6c1',
      name: 'Inpatient'
    },
    'Outside_Neno_District': {
      uuid: '6f48e5b0-9ffa-11e8-98d0-529269fb1459',
      name: 'Outside Neno District'
    },
    'Other': {
      uuid: '656cce7e-977f-11e1-8993-905e29aff6c1',
      name: 'Other'
    }
  }
};

export const FORM_ANSWERS = {
  'bledAnswers' : [
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.True.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.True.name },
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.False.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.False.name },
  ],
  'eidNoSampleAnswers': [
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.UnableToDrawBlood.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.UnableToDrawBlood.name },
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.PatientRefused.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.PatientRefused.name },
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.InadequateSupplies.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.InadequateSupplies.name },
  ],
  'noSampleAnswers': [
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.UnableToDrawBlood.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.UnableToDrawBlood.name },
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.PatientRefused.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.PatientRefused.name },
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.InadequateSupplies.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.InadequateSupplies.name },
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.NeedsAdherenceCounseling.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.NeedsAdherenceCounseling.name },
  ],
  'reasonForTesting': [
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.Routine.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.Routine.name },
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.Confirmatory.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.Confirmatory.name },
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.Target.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.Target.name },
  ],
  'dnaPcrReasonForTesting': [
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.SixWeeksRoutine.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.SixWeeksRoutine.name },
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.Confirmatory.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.Confirmatory.name }
  ],
  'labLocation': [
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.NenoGeneXpert.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.NenoGeneXpert.name },
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.CentralLaboratory.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.CentralLaboratory.name },
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.LisungwiGeneXpert.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.LisungwiGeneXpert.name },
  ],
  'htcAnswers': [
    { uuid: CONCEPTS.HTC_RESULTS.Reactive.uuid, name: CONCEPTS.HTC_RESULTS.Reactive.name },
    { uuid: CONCEPTS.HTC_RESULTS.Non_Reactive.uuid, name: CONCEPTS.HTC_RESULTS.Non_Reactive.name },
    { uuid: CONCEPTS.HTC_RESULTS.Not_Done.uuid, name: CONCEPTS.HTC_RESULTS.Not_Done.name },
  ]
};

export const NAV_MENU_PAGES = {
  '/' : { display : 'Home', icon : 'home'},
  '/searchPatient' : { display : 'Search Patient', icon : 'search'},
  '/checkin/checkInTabs' : { display : 'Check-In', icon : 'notes-medical'},
  '/screening/vl/tabs' : { display : 'Viral Load', icon : 'vial' },
  '/screening/eid/tabs' : { display : 'EID', icon : 'child' },
  '/screening/nutrition/queue' : { display : 'Nutrition', icon : 'lemon' },
  '/screening/bloodPressure/queue' : { display : 'Blood Pressure', icon : 'heart' },
  '/screening/htc/queue' : { display : 'HTC', icon : 'ribbon' },
  '/screening/nurse/queue' : { display : 'Nurse', icon : 'user-md' },
};

export const USER_MENU_PAGES = {
  '/user/settings' : { display : 'Settings', icon : 'cog' },
  '/user/settings/password' : { display : 'Change Password', icon : 'key' },
  '/logout' : { display : 'Logout', icon : 'sign-out-alt' },
};

