// TODO: rename to "config.js"?
// TODO: this will be refactored out into an external config at some point

export const SESSION_TIMEOUT = 1000 * 60 * 10; // 10 minutes
// TODO tweak this as needed depending on other data points
export const ACTIVE_VISITS_REP =
  'custom:(id,uuid,location:(uuid,display,name),startDatetime,stopDatetime,' +
  'patient:(id,uuid,id,display,identifiers:(uuid,identifier,identifierType:(uuid),preferred),' +
  'person:(id,uuid,display,gender,age,birthdate,birthdateEstimated,dead,deathDate,causeOfDeath,preferredName:(familyName,givenName,middleName,display))),' +
  'encounters:(id,uuid,encounterDatetime,location:(id,uuid,name),encounterType:(id,uuid,name),' +
  'obs:(uuid,id,value,concept:(uuid),comment,display)' +
  ')';

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
  'EidEncounterType': {
    uuid: '8383DE35-5145-4953-A018-34876B797F3E'
  },
  'AdherenceCounselingEncounterType': {
    uuid: '7D801495-3857-422F-BE2A-A4EEB3F36278'
  },
};

export const ENCOUNTER_ROLES = {
  'UnknownEncounterRole': {
    uuid: 'a0b03050-c99b-11e0-9572-0800200c9a66'
  },
  'NurseEncounterRole': {
    uuid: '98bf2792-3f0a-4388-81bb-c78b29c0df92'
  },
  'ConsultingClinicianEncounterRole': {
    uuid: '4f10ad1a-ec49-48df-98c7-1391c6ac7f05'
  }
};

export const HIV_TEST_TYPES = {
  hiv_test: 'HIV test',
  rapid_test: 'HIV rapid test, qualitative'
};

export const MALNUTRITION_LEVEL = {
  'none': {
    alert: "default",
    message: "None"
  },
  'severe': {
    alert: "danger",
    message: "Severe"
  },
  'moderate': {
    alert: "warning",
    message: "Moderate"
  },
  'normal': {
    alert: "success",
    message: "Normal"
  },
  'overweight': {
    alert: "info",
    message: "Overweight"
  }
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
  'True': {
    uuid: '655e2f90-977f-11e1-8993-905e29aff6c1',
    name: 'Yes'
  },
  'False': {
    uuid: '655e3148-977f-11e1-8993-905e29aff6c1',
    name: 'No'
  },
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
  'MUAC': {
    uuid: '6558d09a-977f-11e1-8993-905e29aff6c1'
  },
  'Pregnant': {
    uuid: '656fbd28-977f-11e1-8993-905e29aff6c1'
  },
  'HIV_TEST_TYPE': {
    uuid: '655bee06-977f-11e1-8993-905e29aff6c1',
    name: 'HIV Test Type'
  },
  'HIV_RAPID_TEST': {
    uuid: '654b983a-977f-11e1-8993-905e29aff6c1',
    name: 'HIV Rapid Test'
  },
  'HIV_DNA_PCR_TEST': {
    uuid: '654a6960-977f-11e1-8993-905e29aff6c1',
    name: 'DNA PCR'
  },
  'HTC_RESULTS': {
    uuid: '655dcb7c-977f-11e1-8993-905e29aff6c1',
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
  'ADHERENCE_COUNSELING': {
    'AdherenceSession': {
      uuid: '06b1f7d8-b6cc-11e8-96f8-529269fb1459',
      name: 'Adherence Session',
      'FirstSession': {
        uuid: '697e9461-f2d6-4ab1-a140-48f768ce002a',
        name: '1st Session'
      },
      'SecondSession': {
        uuid: '11c0f708-6950-4e94-b080-5c76174a4947',
        name: '2nd Session'
      },
      'ThirdSession': {
        uuid: '224e3d57-f6d1-4244-bbe2-b81a574ba7aa',
        name: '3rd Session'
      }
    },
    'NameOfCounselor': {
      uuid: '6562b4fc-977f-11e1-8993-905e29aff6c1',
      name: 'Name of counselor'
    },
    'CounseledOnPillCounts': {
      uuid: '06b2005c-b6cc-11e8-96f8-529269fb1459',
      name: 'Counseled on pill counts'
    },
    'DrugAdherencePercentage': {
      uuid: '20E91F16-BA4F-4058-B17A-998A82F4B803',
      name: 'Drug adherence percentage'
    },
    'CounseledOnViralLoad': {
      uuid: '06b20a2a-b6cc-11e8-96f8-529269fb1459',
      name: 'Counseled on viral load'
    }
  },
  'VIRAL_LOAD_TEST_SET': {
    uuid: '83931c6d-0e5a-4302-b8ce-a31175b6475e',
    'Bled': {
      uuid: 'f792f2f9-9c24-4d6e-98fd-caffa8f2383f',
      name: 'Bled'
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

export const FORM_NAMES = {
  eidFormName: 'eid-hiv-test-form'
};

export const FORM_ANSWERS = {
  'referrals': [
    { uuid: CONCEPTS.SOURCE_OF_REFERRAL.SHARC.uuid, name: CONCEPTS.SOURCE_OF_REFERRAL.SHARC.name },
    { uuid: CONCEPTS.SOURCE_OF_REFERRAL.OPD_at_health_center.uuid, name: CONCEPTS.SOURCE_OF_REFERRAL.OPD_at_health_center.name },
    { uuid: CONCEPTS.SOURCE_OF_REFERRAL.Inpatient.uuid, name: CONCEPTS.SOURCE_OF_REFERRAL.Inpatient.name },
    { uuid: CONCEPTS.SOURCE_OF_REFERRAL.Outside_Neno_District.uuid, name: CONCEPTS.SOURCE_OF_REFERRAL.Outside_Neno_District.name },
    { uuid: CONCEPTS.SOURCE_OF_REFERRAL.Other.uuid, name: CONCEPTS.SOURCE_OF_REFERRAL.Other.name }
  ],
  'trueFalse' : [
    { uuid: CONCEPTS.True.uuid, name: CONCEPTS.True.name },
    { uuid: CONCEPTS.False.uuid, name: CONCEPTS.False.name },
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
  'eidHivTestType': [
    { uuid: CONCEPTS.HIV_RAPID_TEST.uuid, name: CONCEPTS.HIV_RAPID_TEST.name },
    { uuid: CONCEPTS.HIV_DNA_PCR_TEST.uuid, name: CONCEPTS.HIV_DNA_PCR_TEST.name }
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
  ],
  'adherenceSession': [
    { uuid: CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.FirstSession.uuid, name: CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.FirstSession.name },
    { uuid: CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.SecondSession.uuid, name: CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.SecondSession.name },
    { uuid: CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.ThirdSession.uuid, name: CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.ThirdSession.name },
  ]
};

export const NAV_MENU_PAGES = {
  '/' : { display : 'Home', icon : 'home'},
  '/searchPatient' : { display : 'Search Patient', icon : 'search'},
  '/checkin/checkInTabs' : { display : 'Check-In', icon : 'notes-medical'},
  '/screening/vl/tabs' : { display : 'Viral Load', icon : 'vial' },
  '/screening/adherence/queue' : { display : 'Adherence', icon : 'pills' },
  '/screening/eid/tabs' : { display : 'EID', icon : 'child' },
  '/screening/nutrition/queue' : { display : 'Nutrition', icon : 'lemon' },
  '/screening/bloodPressure/queue' : { display : 'Blood Pressure', icon : 'heart' },
  '/screening/htc/queue' : { display : 'HTC', icon : 'ribbon' },
  /*  '/screening/nurse/queue' : { display : 'Nurse', icon : 'user-md' },*/
};

export const USER_MENU_PAGES = {
  /*'/user/settings' : { display : 'Settings', icon : 'cog' },
  '/user/settings/password' : { display : 'Change Password', icon : 'key' },*/
  '/logout' : { display : 'Logout', icon : 'sign-out-alt' },
};

export const VIRAL_LOAD_ALERTS = [
  "due-for-routine-viral-load-1",
  "due-for-routine-viral-load-2",
  "due-for-routine-viral-load-3",
  "due-for-confirmatory-viral-load",
  "due-for-routine-viral-load-1p",
  "due-for-routine-viral-load-2p",
  "due-for-routine-viral-load-3p"
];

export const EID_RAPID_TEST = [
  "eid-routine-12-month-rapid-test",
  "eid-routine-24-month-rapid-test"
];
export const EID_DNA_PCR = [
  "eid-positive-rapid-test",
  "eid-positive-dna-pcr-test",
  "eid-routine-dna-pcr-test"
];
export const EID_ALERTS = [
  ...EID_RAPID_TEST,
  ...EID_DNA_PCR
];
