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
  'TBScreeningEncounterType': {
    uuid: '45F221B9-7254-4B15-811B-5B8C8912F245'
  },
  'TBTestResults': {
    uuid: 'C770232A-4847-42D9-8F70-B01B5BA0EED8'
  },
  'ClinicalPlan': {
    uuid: '04E668BA-E24F-43FF-A135-A085EC3DBE40'
  },
  'SputumEncounterType': {
    uuid: '04E668BA-E24F-43FF-A135-A085EC3DBE40'
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

/*export const IDENTIFIER_TYPES = {
  'ART_IDENTIFIER_TYPE': {
    uuid: '66784d84-977f-11e1-8993-905e29aff6c1'
  },
  'EID_IDENTIFIER_TYPE': {
    uuid: '66786256-977f-11e1-8993-905e29aff6c1'
  },
  'NCD_IDENTIFIER_TYPE': {
    uuid: 'f24f52b7-daf4-4a35-9124-fbc00160a98d'
  }
};*/

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
  'SputumReceived': {
    uuid: '165252AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    name: 'Sputum received'
  },
  'SampleQuality': {
    uuid: '165253AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    name: 'Sputum received'
  },
  'SputumReceivedTrue': {
    uuid: '3cd6f600-26fe-102b-80cb-0017a47871b2',
    name: 'Yes'
  },
  'SputumReceivedFalse': {
    uuid: '3cd6f86c-26fe-102b-80cb-0017a47871b2',
    name: 'No'
  },
  'satisfactorySampleQuality': {
    uuid: '6559dde6-977f-11e1-8993-905e29aff6c1',
    name: 'satisfactory'
  },
  'unsatisfactorySampleQuality': {
    uuid: '1304AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    name: 'unsatisfactory'
  },
  'SymptomPresent': {
    uuid: '6558d3ba-977f-11e1-8993-905e29aff6c1',
    name: 'Symptom Present',
    display: 'Yes'
  },
  'SymptomAbsent': {
    uuid: '655b50fe-977f-11e1-8993-905e29aff6c1',
    name: 'Symptom Absent',
    display: 'No'
  },
  'SystolicBloodPressure' : {
    uuid: '6569bffe-977f-11e1-8993-905e29aff6c1',
    hiNormal: 160,
    hiAbsolute: 260,
    lowAbsolute: 50
  },
  'DiastolicBloodPressure' : {
    uuid: '6569c116-977f-11e1-8993-905e29aff6c1',
    hiNormal: 110,
    hiAbsolute: 140,
    lowAbsolute: 40
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
  "HIV_TEST_RESULTS": {
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
  },
  'microscopy': {
    uuid: '006bbf38-168b-4d7a-8012-ca81d5e9b059',
    name: 'microscopy'
  },
  'VIRAL_LOAD_TEST_SET': {
    uuid: '83931c6d-0e5a-4302-b8ce-a31175b6475e'
  },
  'TB': {
    'Cough': {
      uuid: '65460a32-977f-11e1-8993-905e29aff6c1',
      name: 'Cough'
    },
    'Fever': {
      uuid: '656e9844-977f-11e1-8993-905e29aff6c1',
      name: 'Fever'
    },
    'NightSweats': {
      uuid: '656f10da-977f-11e1-8993-905e29aff6c1',
      name: 'Night Sweats'
    },
    'WeightLoss': {
      uuid: '654a56be-977f-11e1-8993-905e29aff6c1',
      name: 'Weight loss'
    },
    'RecentContactWithActiveTB': {
      uuid: 'a6c1cd1c-b4a2-405a-930c-f11c914d50c5',
      name: 'Recent contact with active TB (<1 year)'
    },
    'PainfulNeckAndArmpitLymphNodes': {
      uuid: '974d5caf-2db6-4d5d-b509-11c6f5340ea5',
      name: 'Painful nexk and armpit lymph nodes'
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
    }
  },
  'TBTestType': {
    uuid: '38c4512a-5aef-487d-a450-ecea4bc5df7e',
    name: 'Tuberculosis test type'
  },
  'GeneXpert': {
    uuid: '162202AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    name: 'GeneXpert'
  },
  'Smear': {
    uuid: '65628568-977f-11e1-8993-905e29aff6c1',
    name: 'Smear'
  },
  'TBDetected': {
    uuid: '1301AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    name: 'Detected'
  },
  'TBUndetected': {
    uuid: '1302AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    name: 'Undetected'
  },
  'ReasonForNoResult': {
    uuid: '656fa450-977f-11e1-8993-905e29aff6c1',
    name: 'No Result'
  },
  'RifampinResistance': {
    uuid: '164937AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    name: 'Rifampin Resistance'
  },
  'PositiveRifampinResistance': {
    uuid: '162203AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    name: 'Positive'
  },
  'NegativeRifampinResistance': {
    uuid: '162204AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    name: 'Negative'
  },
  'IndeterminateRifampinResistance': {
    uuid: '164104AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    name: 'Indeterminate'
  },
  'Contaminated': {
    uuid: '65597a5e-977f-11e1-8993-905e29aff6c1',
    name: 'Contaminated'
  },
  'EquipmentFailure': {
    uuid: '165179AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    name: 'Equipment Failure'
  },
  'UnsatisfactorySample': {
    uuid: '66188fb6-977f-11e1-8993-905e29aff6c1',
    name: 'Unsatisfactory sample'
  },
  'InappropriateSampleContainer': {
    uuid: '165181AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    name: 'Inappropriate sample container used'
  },
  'UnavailableSupplies': {
    uuid: '165183AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    name: 'Supplies not available'
  },
  'Other': {
    uuid: '657140f8-977f-11e1-8993-905e29aff6c1',
    name: 'Other'
  },
  'TBSmearResult': {
    'Positive': {
      uuid: '6549be7a-977f-11e1-8993-905e29aff6c1',
      name: 'Positive'
    },
    'Negative': {
      uuid: '654994c2-977f-11e1-8993-905e29aff6c1',
      name: 'Negative'
    },
    'NoResult': {
      uuid: '6557987e-977f-11e1-8993-905e29aff6c1',
      name: 'No Result'
    }
  }

  
};

export const FORM_NAMES = {
  eidFormName: 'eid-hiv-test-form'
};

export const FORM_ANSWERS = {
  'tbTestTypeanswers': [
    { uuid: CONCEPTS.GeneXpert.uuid, name: CONCEPTS.GeneXpert.name },
    { uuid: CONCEPTS.Smear.uuid, name: CONCEPTS.Smear.name }
  ],
  'GeneXpertAnswers': [
    { uuid: CONCEPTS.TBDetected.uuid, name: CONCEPTS.TBDetected.name },
    { uuid: CONCEPTS.TBUndetected.uuid, name: CONCEPTS.TBUndetected.name },
    { uuid: CONCEPTS.ReasonForNoResult.uuid, name: CONCEPTS.ReasonForNoResult.name }
  ],
  'SmearAnswers': [
    { uuid: CONCEPTS.TBSmearResult.Positive.uuid, name: CONCEPTS.TBSmearResult.Positive.name },
    { uuid: CONCEPTS.TBSmearResult.Negative.uuid, name: CONCEPTS.TBSmearResult.Negative.name },
    { uuid: CONCEPTS.TBSmearResult.NoResult.uuid, name: CONCEPTS.TBSmearResult.NoResult.name }
  ],
  'RifampinResistanceAnswers': [
    { uuid: CONCEPTS.PositiveRifampinResistance.uuid, name: CONCEPTS.PositiveRifampinResistance.name },
    { uuid: CONCEPTS.NegativeRifampinResistance.uuid, name: CONCEPTS.NegativeRifampinResistance.name },
    { uuid: CONCEPTS.IndeterminateRifampinResistance.uuid, name: CONCEPTS.IndeterminateRifampinResistance.name },
  ],
  'ReasonForNoTBResultAnswers': [
    { uuid: CONCEPTS.Contaminated.uuid, name: CONCEPTS.Contaminated.name },
    { uuid: CONCEPTS.UnsatisfactorySample.uuid, name: CONCEPTS.UnsatisfactorySample.name },
    { uuid: CONCEPTS.EquipmentFailure.uuid, name: CONCEPTS.EquipmentFailure.name },
    { uuid: CONCEPTS.InappropriateSampleContainer.uuid, name: CONCEPTS.InappropriateSampleContainer.name },
    { uuid: CONCEPTS.UnavailableSupplies.uuid, name: CONCEPTS.UnavailableSupplies.name },
    { uuid: CONCEPTS.Other.uuid, name: CONCEPTS.Other.name },
  ],
  'referrals': [
    { uuid: CONCEPTS.SOURCE_OF_REFERRAL.SHARC.uuid, name: CONCEPTS.SOURCE_OF_REFERRAL.SHARC.name },
    { uuid: CONCEPTS.SOURCE_OF_REFERRAL.OPD_at_health_center.uuid, name: CONCEPTS.SOURCE_OF_REFERRAL.OPD_at_health_center.name },
    { uuid: CONCEPTS.SOURCE_OF_REFERRAL.Inpatient.uuid, name: CONCEPTS.SOURCE_OF_REFERRAL.Inpatient.name },
    { uuid: CONCEPTS.SOURCE_OF_REFERRAL.Outside_Neno_District.uuid, name: CONCEPTS.SOURCE_OF_REFERRAL.Outside_Neno_District.name },
    { uuid: CONCEPTS.SOURCE_OF_REFERRAL.Other.uuid, name: CONCEPTS.SOURCE_OF_REFERRAL.Other.name }
  ],
  'sampleQualityAnswers': [
    { uuid: CONCEPTS.satisfactorySampleQuality.uuid, name: CONCEPTS.satisfactorySampleQuality.name },
    { uuid: CONCEPTS.unsatisfactorySampleQuality.uuid, name: CONCEPTS.unsatisfactorySampleQuality.name },
  ],
  'sputumReceivedYesNo': [
    { uuid: CONCEPTS.SputumReceivedTrue.uuid, name: CONCEPTS.SputumReceivedTrue.name },
    { uuid: CONCEPTS.SputumReceivedFalse.uuid, name: CONCEPTS.SputumReceivedFalse.name },
  ],
  'trueFalse' : [
    { uuid: CONCEPTS.True.uuid, name: CONCEPTS.True.name },
    { uuid: CONCEPTS.False.uuid, name: CONCEPTS.False.name },
  ],
  'eidNoSampleAnswers': [
    { uuid: CONCEPTS.UnableToDrawBlood.uuid, name: CONCEPTS.UnableToDrawBlood.name },
    { uuid: CONCEPTS.PatientRefused.uuid, name: CONCEPTS.PatientRefused.name },
    { uuid: CONCEPTS.InadequateSupplies.uuid, name: CONCEPTS.InadequateSupplies.name },
  ],
  'noSampleAnswers': [
    { uuid: CONCEPTS.UnableToDrawBlood.uuid, name: CONCEPTS.UnableToDrawBlood.name },
    { uuid: CONCEPTS.PatientRefused.uuid, name: CONCEPTS.PatientRefused.name },
    { uuid: CONCEPTS.InadequateSupplies.uuid, name: CONCEPTS.InadequateSupplies.name },
    { uuid: CONCEPTS.NeedsAdherenceCounseling.uuid, name: CONCEPTS.NeedsAdherenceCounseling.name },
  ],
  'reasonForTesting': [
    { uuid: CONCEPTS.Routine.uuid, name: CONCEPTS.Routine.name },
    { uuid: CONCEPTS.Confirmatory.uuid, name: CONCEPTS.Confirmatory.name },
    { uuid: CONCEPTS.Target.uuid, name: CONCEPTS.Target.name },
  ],
  'eidHivTestType': [
    { uuid: CONCEPTS.HIV_RAPID_TEST.uuid, name: CONCEPTS.HIV_RAPID_TEST.name },
    { uuid: CONCEPTS.HIV_DNA_PCR_TEST.uuid, name: CONCEPTS.HIV_DNA_PCR_TEST.name }
  ],
  'dnaPcrReasonForTesting': [
    { uuid: CONCEPTS.SixWeeksRoutine.uuid, name: CONCEPTS.SixWeeksRoutine.name },
    { uuid: CONCEPTS.Confirmatory.uuid, name: CONCEPTS.Confirmatory.name }
  ],
  'labLocation': [
    { uuid: CONCEPTS.NenoGeneXpert.uuid, name: CONCEPTS.NenoGeneXpert.name },
    { uuid: CONCEPTS.CentralLaboratory.uuid, name: CONCEPTS.CentralLaboratory.name },
    { uuid: CONCEPTS.LisungwiGeneXpert.uuid, name: CONCEPTS.LisungwiGeneXpert.name },
    { uuid: CONCEPTS.microscopy.uuid, name: CONCEPTS.microscopy.name },
  ],
  "hivTestResultAnswers": [
    { uuid: CONCEPTS.HIV_TEST_RESULTS.Reactive.uuid, name: CONCEPTS.HIV_TEST_RESULTS.Reactive.name },
    { uuid: CONCEPTS.HIV_TEST_RESULTS.Non_Reactive.uuid, name: CONCEPTS.HIV_TEST_RESULTS.Non_Reactive.name },
    { uuid: CONCEPTS.HIV_TEST_RESULTS.Not_Done.uuid, name: CONCEPTS.HIV_TEST_RESULTS.Not_Done.name },
  ],
  'adherenceSession': [
    { uuid: CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.FirstSession.uuid, name: CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.FirstSession.name },
    { uuid: CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.SecondSession.uuid, name: CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.SecondSession.name },
    { uuid: CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.ThirdSession.uuid, name: CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.ThirdSession.name },
  ],
  'coughPresent': [
    { uuid: CONCEPTS.TB.Cough.uuid, name: 'Yes' }
  ],
  'coughAbsent': [
    { uuid: CONCEPTS.TB.Cough.uuid, name: 'No' }
  ],
  'feverPresent': [
    { uuid: CONCEPTS.TB.Fever.uuid, name: 'Yes' }
  ],
  'feverAbsent': [
    { uuid: CONCEPTS.TB.Fever.uuid, name: 'No' }
  ],
  'nightSweatPresent': [
    { uuid: CONCEPTS.TB.NightSweats.uuid, name: 'Yes' }
  ],
  'nightSweatAbsent': [
    { uuid: CONCEPTS.TB.NightSweats.uuid, name: 'No' }
  ],
  'weightLossPresent': [
    { uuid: CONCEPTS.TB.WeightLoss.uuid, name: 'Yes' }
  ],
  'weightlossAbsent': [
    { uuid: CONCEPTS.TB.WeightLoss.uuid, name: 'No' }
  ],
  'recentContactWithActiveTBPresent': [
    { uuid: CONCEPTS.TB.RecentContactWithActiveTB.uuid, name: 'Yes' }
  ],
  'recentContactWithActiveTBAbsent': [
    { uuid: CONCEPTS.TB.RecentContactWithActiveTB.uuid, name: 'No' }
  ],
  'painfulNeckAndArmpitLymphTBPresent': [
    { uuid: CONCEPTS.TB.PainfulNeckAndArmpitLymphNodes.uuid, name: 'Yes' }
  ],
  'painfulNeckAndArmpitLymphTBAbsent': [
    { uuid: CONCEPTS.TB.PainfulNeckAndArmpitLymphNodes.uuid, name: 'No' }
  ],
};

export const NAV_MENU_PAGES = {
  '/' : { display : 'Home', icon : 'home' },
  '/searchPatient' : { display : 'Search Patient', icon : 'search' },
  '/checkin/checkInQueue': { display: 'Check-In', icon: 'notes-medical' },
  '/screening/vl/queue': { display: 'Viral Load', icon: 'vial' },
  '/screening/tb/queue': { display: 'Tuberculosis', icon: 'vial' },
  '/screening/adherence/queue' : { display : 'Adherence', icon : 'pills' },
  '/screening/eid/queue': { display: 'EID', icon: 'child' },
  '/screening/nutrition/queue' : { display : 'Nutrition', icon : 'lemon' },
  '/screening/bloodPressure/queue' : { display : 'Blood Pressure', icon : 'heart' },
  '/screening/htc/queue' : { display : 'HTC', icon : 'ribbon' },
  '/screening/clinician/queue': { display : 'Clinician'}
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

export const VIRAL_LOAD_ALERTS_CATEGORIES = [
  "viral-load"
];
export const HTC_ALERTS_CATEGORIES = [
  "htc"
];

export const EID_ALERTS_CATEGORIES = [
  "eid"
];

export const SPUTUM_ALERTS_CATEGORIES = [
  "sputum"
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
export const PATIENT_IDENTIFIERS_SUFFIX = ['HCC', 'CCC'];
export const LOCATION_CODE_UUID = '62eb8441-0326-11e6-8c93-e82aea237783';
