// TODO: rename to "config.js"?
// TODO: this will be refactored out into an external config at some point

export const SESSION_TIMEOUT = 1000 * 60 * 10; // 10 minutes
// TODO tweak this as needed depending on other data points; note that it only supports two levels of obs groups at this point
export const ACTIVE_VISITS_REP =
  'custom:(id,uuid,location:(uuid,display,name),startDatetime,stopDatetime,' +
  'patient:(id,uuid,id,display,identifiers:(uuid,identifier,identifierType:(uuid),preferred),' +
  'person:(id,uuid,display,gender,age,birthdate,birthdateEstimated,dead,deathDate,causeOfDeath,preferredName:(familyName,givenName,middleName,display))),' +
  'encounters:(id,uuid,encounterDatetime,location:(id,uuid,name),encounterType:(id,uuid,name),' +
  'obs:(uuid,id,value,concept:(uuid),comment,display,encounter:(uuid,encounterType:(name)),obsGroup:(uuid),groupMembers:' +
  '(uuid,id,value,concept:(uuid),comment,display,encounter:(uuid),obsGroup:(uuid),groupMembers:(uuid)))' +
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
  }
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
    message: "Severe",
    display: "Critical value",
    displayClassName: "field-error"
  },
  'moderate': {
    alert: "warning",
    message: "Moderate",
    display: "Abnormal value",
    displayClassName: "field-warning"
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
  'HCC_IDENTIFIER_TYPE': {
    uuid: '66786256-977f-11e1-8993-905e29aff6c1'
  }, 
  'CCC_IDENTIFIER_TYPE': {
    uuid: 'f24f52b7-daf4-4a35-9124-fbc00160a98d'
  }, 
};

export const LOCATION_TYPES = {
  'UnknownLocation': {
    uuid: '8d6c993e-c2cc-11de-8d13-0010c6dffd0f'
  }
};

// annoyingly we use both "True/False" and "Yes/No" in Malawi behind the scenes, separate concepts with separate uuids
export const CONCEPTS = {
  'True': {
    uuid: '655e2f90-977f-11e1-8993-905e29aff6c1',
    display: 'Yes'
  },
  'False': {
    uuid: '655e3148-977f-11e1-8993-905e29aff6c1',
    display: 'No'
  },
  'Yes': {
    uuid: '65576354-977f-11e1-8993-905e29aff6c1',
    display: 'Yes'
  },
  'No': {
    uuid: '6557646c-977f-11e1-8993-905e29aff6c1',
    display: 'No'
  },
  'SampleCollected': {
    uuid: '165252AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    display: 'Sample Collected'
  },
  'SampleQuality': {
    uuid: '165253AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    display: 'Sample Quality'
  },
  'satisfactorySampleQuality': {
    uuid: '6559dde6-977f-11e1-8993-905e29aff6c1',
    display: 'Satisfactory'
  },
  'unsatisfactorySampleQuality': {
    uuid: '1304AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    display: 'Unsatisfactory'
  },
  'SystolicBloodPressure' : {
    uuid: '6569bffe-977f-11e1-8993-905e29aff6c1',
    hiNormal: 160,
    hiAbsolute: 260,
    lowAbsolute: 50,
    hiCritical: 200,
    lowCritical: 80,
  },
  'DiastolicBloodPressure' : {
    uuid: '6569c116-977f-11e1-8993-905e29aff6c1',
    hiNormal: 110,
    hiAbsolute: 140,
    lowAbsolute: 40,
    hiCritical: 120,
    lowCritical: 50
  },
  'Height': {
    uuid: '6569c562-977f-11e1-8993-905e29aff6c1'
  },
  'Weight': {
    uuid: '6569c44a-977f-11e1-8993-905e29aff6c1'
  },
  'MUAC': {
    uuid: '6558d09a-977f-11e1-8993-905e29aff6c1',
    display: "MUAC"
  },
  'Pregnant': {
    uuid: '656fbd28-977f-11e1-8993-905e29aff6c1'
  },
  'BMI': {
    uuid: '655d615a-977f-11e1-8993-905e29aff6c1',
    display: 'BMI (calculated)',
    hiNormal: 24.9,
    lowNormal: 18.4,
    lowCritical: 16
  },
  'HIV_TEST_CONSTRUCT': {
    uuid: '655dca78-977f-11e1-8993-905e29aff6c1'
  },
  'HIV_TEST_TYPE': {
    uuid: '655bee06-977f-11e1-8993-905e29aff6c1',
    display: 'HIV Test Type'
  },
  'HIV_RAPID_TEST': {
    uuid: '654b983a-977f-11e1-8993-905e29aff6c1',
    display: 'HIV Rapid Test'
  },
  'HIV_DNA_PCR_TEST': {
    uuid: '654a6960-977f-11e1-8993-905e29aff6c1',
    display: 'DNA PCR'
  },
  "HIV_TEST_RESULTS": {
    uuid: '655dcb7c-977f-11e1-8993-905e29aff6c1',
    'Reactive': {
      uuid: '6549be7a-977f-11e1-8993-905e29aff6c1',
      display: 'Reactive'
    },
    'Non_Reactive': {
      uuid: '654994c2-977f-11e1-8993-905e29aff6c1',
      display: 'Non-Reactive'
    },
    'Not_Done': {
      uuid: '6557a4ae-977f-11e1-8993-905e29aff6c1',
      display: 'Not performed today'
    }
  },
  'ADHERENCE_COUNSELING': {
    'AdherenceSession': {
      uuid: '06b1f7d8-b6cc-11e8-96f8-529269fb1459',
      display: 'Adherence Session',
      'FirstSession': {
        uuid: '697e9461-f2d6-4ab1-a140-48f768ce002a',
        display: '1st Session'
      },
      'SecondSession': {
        uuid: '11c0f708-6950-4e94-b080-5c76174a4947',
        display: '2nd Session'
      },
      'ThirdSession': {
        uuid: '224e3d57-f6d1-4244-bbe2-b81a574ba7aa',
        display: '3rd Session'
      }
    },
    'NameOfCounselor': {
      uuid: '6562b4fc-977f-11e1-8993-905e29aff6c1',
      display: 'Name of counselor'
    },
    'CounseledOnPillCounts': {
      uuid: '06b2005c-b6cc-11e8-96f8-529269fb1459',
      display: 'Counseled on pill counts'
    },
    'DrugAdherencePercentage': {
      uuid: '20E91F16-BA4F-4058-B17A-998A82F4B803',
      display: 'Drug adherence percentage'
    },
    'MissedDosesLastWeek': {
      uuid: '290c1601-a1a7-4a4c-8dc7-d18a17f059a2',
      display: 'Missed doses in the last 7 days'
    },
    'CounseledOnViralLoad': {
      uuid: '06b20a2a-b6cc-11e8-96f8-529269fb1459',
      display: 'Counseled on viral load'
    }
  },
  'ViralLoadTestSet': {
    uuid: '83931c6d-0e5a-4302-b8ce-a31175b6475e'
  },
  'ViralLoad': {
    uuid: '654a7694-977f-11e1-8993-905e29aff6c1'
  },
  'ViralLoadLessThanLimit': {
    uuid: '69e87644-5562-11e9-8647-d663bd873d93'
  },
  'ViralLoadResultCompleted': {
    uuid: '6558b0c4-977f-11e1-8993-905e29aff6c1',
    display: 'Completed'
  },
  'ViralLoadResultUnableToProcess': {
    uuid: '3cd75550-26fe-102b-80cb-0017a47871b2',
    display: 'Unable to process'
  },
  'HIVViralLoadStatus': {
    uuid: '163310AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
  },
  'ViralLoadLowerThanDetectionLimit': {
    uuid: 'e97b36a2-16f5-11e6-b6ba-3e1d05defe78'
  },
  'ViralLoadLowerThanDetectionLimitTrue': {
    uuid: '655e2f90-977f-11e1-8993-905e29aff6c1',
    display: '< LDL'
  },
  'ViralLoadDetectablelowerLimit': {
    uuid: '53cb83ed-5d55-4b63-922f-d6b8fc67a5f8',
  },
  'Bled': {
    uuid: 'f792f2f9-9c24-4d6e-98fd-caffa8f2383f',
    display: 'Bled'
  },
  'ReasonForNoSample': {
    uuid: '0e447d92-a180-11e8-98d0-529269fb1459',
    display: 'Reason for no sample'
  },
  'UnableToDrawBlood': {
    uuid: '0e447720-a180-11e8-98d0-529269fb1459',
    display: 'Unable to draw blood'
  },
  'PatientRefused': {
    uuid: '6566a4ae-977f-11e1-8993-905e29aff6c1',
    display: 'Patient refused'
  },
  'InadequateSupplies': {
    uuid: '655dc866-977f-11e1-8993-905e29aff6c1',
    display: 'Inadequate supplies for testing'
  },
  'NeedsAdherenceCounseling': {
    uuid: 'bc7bd9f2-b21d-11e8-96f8-529269fb1459',
    display: 'Needs additional adherence counseling'
  },
  'ReasonForTesting': {
    uuid: '164126AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    display: 'Reason for testing'
  },
  'Routine': {
    uuid: 'e0821812-955d-11e7-abc4-cec278b6b50a',
    display: 'Routine'
  },
  'SixWeeksRoutine': {
    uuid: 'e0821812-955d-11e7-abc4-cec278b6b50a',
    display: '6w Routine'
  },
  'Confirmatory': {
    uuid: '65590f06-977f-11e1-8993-905e29aff6c1',
    display: 'Confirmatory'
  },
  'Target': {
    uuid: 'e0821df8-955d-11e7-abc4-cec278b6b50a',
    display: 'Target'
  },
  'LabLocation': {
    uuid: '6fc0ab50-9492-11e7-abc4-cec278b6b50a',
    display: 'Lab Location'
  },
  'NenoGeneXpert': {
    uuid: 'e08214c0-955d-11e7-abc4-cec278b6b50a',
    display: 'Neno GeneXpert'
  },
  'CentralLaboratory': {
    uuid: 'e0820552-955d-11e7-abc4-cec278b6b50a',
    display: 'Central Laboratory'
  },
  'LisungwiGeneXpert': {
    uuid: 'e08212b8-955d-11e7-abc4-cec278b6b50a',
    display: 'Lisungwi GeneXpert'
  },
  'microscopy': {
    uuid: '65628356-977f-11e1-8993-905e29aff6c1',
    display: 'Microscopy'
  },
  'TbTest' : {
    'TuberculosisTestScreeningSet': {
      uuid: '4c92373c-28d6-11e9-b210-d663bd873d93'
    }
  },
  'TB': {
    'TuberculosisScreeningSet': {
      uuid: '6000c2f8-4eb5-4fd9-ac83-a9a9d6bd8478',
    },
    'Cough': {
      uuid: '65460a32-977f-11e1-8993-905e29aff6c1',
      display: 'Cough'
    },
    'Fever': {
      uuid: '656e9844-977f-11e1-8993-905e29aff6c1',
      display: 'Fever'
    },
    'NightSweats': {
      uuid: '656f10da-977f-11e1-8993-905e29aff6c1',
      display: 'Night Sweats'
    },
    'WeightLoss': {
      uuid: '654a56be-977f-11e1-8993-905e29aff6c1',
      display: 'Weight loss'
    },
    'RecentContactWithActiveTB': {
      uuid: 'a6c1cd1c-b4a2-405a-930c-f11c914d50c5',
      display: 'Recent contact with active TB (<1 year)'
    },
    'PainfulNeckAndArmpitLymphNodes': {
      uuid: '974d5caf-2db6-4d5d-b509-11c6f5340ea5',
      display: 'Painful nexk and armpit lymph nodes'
    },
    'SymptomPresent': {
      uuid: '6558d3ba-977f-11e1-8993-905e29aff6c1',
      display: 'Yes'
    },
    'SymptomAbsent': {
      uuid: '655b50fe-977f-11e1-8993-905e29aff6c1',
      display: 'No'
    }
  },
  'SOURCE_OF_REFERRAL' : {
    uuid: '65664fc2-977f-11e1-8993-905e29aff6c1',
    'SHARC': {
      uuid: '6f48dfac-9ffa-11e8-98d0-529269fb1459',
      display: 'SHARC'
    },
    'OPD_at_health_center': {
      uuid: '655ac68e-977f-11e1-8993-905e29aff6c1',
      display: 'OPD at health center'
    },
    'Inpatient': {
      uuid: '655d1772-977f-11e1-8993-905e29aff6c1',
      display: 'Inpatient'
    },
    'Outside_Neno_District': {
      uuid: '6f48e5b0-9ffa-11e8-98d0-529269fb1459',
      display: 'Outside Neno District'
    },
    'Other': {
      uuid: '656cce7e-977f-11e1-8993-905e29aff6c1',
      display: 'Other'
    },
    'Linkage_to_care': {
      uuid: '5f941306-3f64-11e9-b210-d663bd873d93',
      display: 'Linkage to care'
    },
    'Linkage_to_care_ID': {
      uuid: 'B9E98A62-8437-4807-9DF8-37F0046FD0E8',
      display: 'Linkage to care ID'
    },
    'Existing_patient': {
      uuid: '5004B09D-16D6-4439-9481-C9EAA2E939B5',
      display: 'Existing Patient'
    }
  },
  'TBTestType': {
    uuid: '38c4512a-5aef-487d-a450-ecea4bc5df7e',
    display: 'Tuberculosis test type'
  },
  'GeneXpert': {
    uuid: '162202AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    display: 'GeneXpert'
  },
  'Smear': {
    uuid: '65628568-977f-11e1-8993-905e29aff6c1',
    display: 'Smear'
  },
  'TBDetected': {
    uuid: '1301AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    display: 'Detected'
  },
  'TBUndetected': {
    uuid: '1302AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    display: 'Undetected'
  },
  'ReasonForNoResult': {
    uuid: '656fa450-977f-11e1-8993-905e29aff6c1',
    display: 'No Result'
  },
  'RifampinResistance': {
    uuid: '164937AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    display: 'Rifampin Resistance'
  },
  'PositiveRifampinResistance': {
    uuid: '162203AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    display: 'Positive'
  },
  'NegativeRifampinResistance': {
    uuid: '162204AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    display: 'Negative'
  },
  'IndeterminateRifampinResistance': {
    uuid: '164104AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    display: 'Indeterminate'
  },
  'Contaminated': {
    uuid: '65597a5e-977f-11e1-8993-905e29aff6c1',
    display: 'Contaminated'
  },
  'Missing': {
    uuid: 'e0822140-955d-11e7-abc4-cec278b6b50a',
    display: 'Missing'
  },
  'EquipmentFailure': {
    uuid: '165179AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    display: 'Equipment Failure'
  },
  'UnsatisfactorySample': {
    uuid: '656fa55e-977f-11e1-8993-905e29aff6c1',
    display: 'Unsatisfactory Sample'
  },
  'InappropriateSampleContainer': {
    uuid: '165181AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    display: 'Inappropriate sample container used'
  },
  'UnavailableSupplies': {
    uuid: '165183AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    display: 'Supplies not available'
  },
  'Other': {
    uuid: '656cce7e-977f-11e1-8993-905e29aff6c1',
    display: 'Other'
  },
  'TBSmearResult': {
    'Positive': {
      uuid: '6549be7a-977f-11e1-8993-905e29aff6c1',
      display: 'Positive'
    },
    'Negative': {
      uuid: '654994c2-977f-11e1-8993-905e29aff6c1',
      display: 'Negative'
    },
    'NoResult': {
      uuid: '6557987e-977f-11e1-8993-905e29aff6c1',
      display: 'No Result'
    }
  },
  'Clinical': {
    'ClinicalNotes': {
      uuid: '655928e2-977f-11e1-8993-905e29aff6c1',
      display: 'Clinical Notes'
    },
    'Outcome': {
      uuid: '6571d95a-977f-11e1-8993-905e29aff6c1',
      display: 'Outcome'
    },
    'FollowUp': {
      uuid: '65700d1e-977f-11e1-8993-905e29aff6c1',
      display: 'Follow up appointment'
    },
    'TransferToAnotherFacility': {
      uuid: '6577b668-977f-11e1-8993-905e29aff6c1',
      display: 'Transfer to another facility in Neno'
    },
    'TransferOutsideOfDistrict': {
      uuid: 'e498db2a-04b1-44da-81fd-a2ef86529141',
      display: 'Transfer out of the district for care'
    },
    'ExitFromCare': {
      uuid: '6566dba4-977f-11e1-8993-905e29aff6c1',
      display: 'Exit from care'
    },
    'Other': {
      uuid: '657140f8-977f-11e1-8993-905e29aff6c1',
      display: 'Other'
    },
    'NextAppointmentDate': {
      uuid: '6569cbd4-977f-11e1-8993-905e29aff6c1',
      display: 'Next appointment date'
    },
    'QualitativeTime': {
      uuid: '4c923fca-28d6-11e9-b210-d663bd873d93',
      display: 'Time of day'
    },
    'QualitativeTimeAM': {
      uuid: '656f9bc2-977f-11e1-8993-905e29aff6c1',
      display: 'In the morning'
    },
    'QualitativeTimePM': {
      uuid: '656f9cc6-977f-11e1-8993-905e29aff6c1',
      display: 'In the afternoon'
    },
    'TransferFacility': {
      uuid: '65624b3e-977f-11e1-8993-905e29aff6c1',
      display: 'Transfer Facility (transfer to another facility)'
    },
    'ReasonToStopCare': {
      uuid: '558a783a-2990-11e9-b210-d663bd873d93',
      display: 'Reason to stop care'
    },
    'OtherOutcome': {
      uuid: '558a7114-2990-11e9-b210-d663bd873d93',
      display: 'Other outcome'
    }
  },
  'BreastFeeding': {
    uuid: '657a289e-977f-11e1-8993-905e29aff6c1',
    display: 'Breastfeeding'
  },
  'ExclusiveBreastfeeding': {
    uuid: '656c5264-977f-11e1-8993-905e29aff6c1',
    display: 'Breastfed exclusively'
  },
  'MixedFeeding': {
    uuid: '656f5c2a-977f-11e1-8993-905e29aff6c1',
    display: 'Mixed feeding'
  },
  'ComplimentaryBreastfeeding': {
    uuid: '657a29a2-977f-11e1-8993-905e29aff6c1',
    display: 'Breastfeeding complimentary'
  },
  'StoppedBreastfeeding': {
    'OverSixWeeks': {
      uuid: '657a2bb4-977f-11e1-8993-905e29aff6c1',
      display: 'Breastfeeding stopped over 6 weeks ago'
    },
    'InLastSixWeeks': {
      uuid: '657a2aa6-977f-11e1-8993-905e29aff6c1',
      display: 'Breastfeeding stopped in last 6 weeks',
    },
  },
};

export const FORM_NAMES = {
  eidFormName: 'eid-hiv-test-form'
};

export const FORM_ANSWERS = {
  'clinicalOutcome': [
    { uuid: CONCEPTS.Clinical.FollowUp.uuid, display: CONCEPTS.Clinical.FollowUp.display },
    {
      uuid: CONCEPTS.Clinical.TransferToAnotherFacility.uuid,
      display: CONCEPTS.Clinical.TransferToAnotherFacility.display
    },
    {
      uuid: CONCEPTS.Clinical.TransferOutsideOfDistrict.uuid,
      display: CONCEPTS.Clinical.TransferOutsideOfDistrict.display
    },
    { uuid: CONCEPTS.Clinical.ExitFromCare.uuid, display: CONCEPTS.Clinical.ExitFromCare.display },
  ],
  'clinicalFollowUp': [
    { uuid: CONCEPTS.Clinical.NextAppointmentDate.uuid, display: CONCEPTS.Clinical.NextAppointmentDate.display },
    { uuid: CONCEPTS.Clinical.QualitativeTime.uuid, display: CONCEPTS.Clinical.QualitativeTime.display },
  ],
  'clinicalQualitativeTime': [
    { uuid: CONCEPTS.Clinical.QualitativeTimeAM.uuid, display: CONCEPTS.Clinical.QualitativeTimeAM.display },
    { uuid: CONCEPTS.Clinical.QualitativeTimePM.uuid, display: CONCEPTS.Clinical.QualitativeTimePM.display },
  ],
  'tbTestTypeanswers': [
    { uuid: CONCEPTS.GeneXpert.uuid, display: CONCEPTS.GeneXpert.display },
    { uuid: CONCEPTS.Smear.uuid, display: CONCEPTS.Smear.display }
  ],
  'GeneXpertAnswers': [
    { uuid: CONCEPTS.TBDetected.uuid, display: CONCEPTS.TBDetected.display },
    { uuid: CONCEPTS.TBUndetected.uuid, display: CONCEPTS.TBUndetected.display },
    { uuid: CONCEPTS.ReasonForNoResult.uuid, display: CONCEPTS.ReasonForNoResult.display }
  ],
  'SmearAnswers': [
    { uuid: CONCEPTS.TBSmearResult.Positive.uuid, display: CONCEPTS.TBSmearResult.Positive.display },
    { uuid: CONCEPTS.TBSmearResult.Negative.uuid, display: CONCEPTS.TBSmearResult.Negative.display },
    { uuid: CONCEPTS.TBSmearResult.NoResult.uuid, display: CONCEPTS.TBSmearResult.NoResult.display }
  ],
  'RifampinResistanceAnswers': [
    { uuid: CONCEPTS.PositiveRifampinResistance.uuid, display: CONCEPTS.PositiveRifampinResistance.display },
    { uuid: CONCEPTS.NegativeRifampinResistance.uuid, display: CONCEPTS.NegativeRifampinResistance.display },
    { uuid: CONCEPTS.IndeterminateRifampinResistance.uuid, display: CONCEPTS.IndeterminateRifampinResistance.display },
  ],
  'ReasonForNoResult': [
    { uuid: CONCEPTS.Contaminated.uuid, display: CONCEPTS.Contaminated.display },
    { uuid: CONCEPTS.Missing.uuid, display: CONCEPTS.Missing.display },
    { uuid: CONCEPTS.UnsatisfactorySample.uuid, display: CONCEPTS.UnsatisfactorySample.display },
    { uuid: CONCEPTS.EquipmentFailure.uuid, display: CONCEPTS.EquipmentFailure.display },
    { uuid: CONCEPTS.InappropriateSampleContainer.uuid, display: CONCEPTS.InappropriateSampleContainer.display },
    { uuid: CONCEPTS.UnavailableSupplies.uuid, display: CONCEPTS.UnavailableSupplies.display },
    { uuid: CONCEPTS.Other.uuid, display: CONCEPTS.Other.display },
  ],
  'referrals': [
    { uuid: CONCEPTS.SOURCE_OF_REFERRAL.SHARC.uuid, display: CONCEPTS.SOURCE_OF_REFERRAL.SHARC.display },
    {
      uuid: CONCEPTS.SOURCE_OF_REFERRAL.OPD_at_health_center.uuid,
      display: CONCEPTS.SOURCE_OF_REFERRAL.OPD_at_health_center.display
    },
    { uuid: CONCEPTS.SOURCE_OF_REFERRAL.Inpatient.uuid, display: CONCEPTS.SOURCE_OF_REFERRAL.Inpatient.display },
    {
      uuid: CONCEPTS.SOURCE_OF_REFERRAL.Outside_Neno_District.uuid,
      display: CONCEPTS.SOURCE_OF_REFERRAL.Outside_Neno_District.display
    },
    {
      uuid: CONCEPTS.SOURCE_OF_REFERRAL.Existing_patient.uuid,
      display: CONCEPTS.SOURCE_OF_REFERRAL.Existing_patient.display
    },
    { uuid: CONCEPTS.SOURCE_OF_REFERRAL.Other.uuid, display: CONCEPTS.SOURCE_OF_REFERRAL.Other.display }
  ],
  'sampleQualityAnswers': [
    { uuid: CONCEPTS.satisfactorySampleQuality.uuid, display: CONCEPTS.satisfactorySampleQuality.display },
    { uuid: CONCEPTS.unsatisfactorySampleQuality.uuid, display: CONCEPTS.unsatisfactorySampleQuality.display },
  ],
  'ViralLoadResult' : [
    { uuid: CONCEPTS.ViralLoadResultCompleted.uuid, display: CONCEPTS.ViralLoadResultCompleted.display },
    { uuid: CONCEPTS.ViralLoadResultUnableToProcess.uuid, display: CONCEPTS.ViralLoadResultUnableToProcess.display },
  ],
  'ViralLoadLDL' : [
    { uuid: CONCEPTS.ViralLoadLowerThanDetectionLimitTrue.uuid, display: CONCEPTS.ViralLoadLowerThanDetectionLimitTrue.display },
  ],
  'trueFalse' : [
    { uuid: CONCEPTS.True.uuid, display: CONCEPTS.True.display },
    { uuid: CONCEPTS.False.uuid, display: CONCEPTS.False.display },
  ],
  'yesNo': [
    { uuid: CONCEPTS.Yes.uuid, display: CONCEPTS.Yes.display },
    { uuid: CONCEPTS.No.uuid, display: CONCEPTS.No.display },
  ],
  'eidNoSampleAnswers': [
    { uuid: CONCEPTS.UnableToDrawBlood.uuid, display: CONCEPTS.UnableToDrawBlood.display },
    { uuid: CONCEPTS.PatientRefused.uuid, display: CONCEPTS.PatientRefused.display },
    { uuid: CONCEPTS.InadequateSupplies.uuid, display: CONCEPTS.InadequateSupplies.display },
  ],
  'noSampleAnswers': [
    { uuid: CONCEPTS.UnableToDrawBlood.uuid, display: CONCEPTS.UnableToDrawBlood.display },
    { uuid: CONCEPTS.PatientRefused.uuid, display: CONCEPTS.PatientRefused.display },
    { uuid: CONCEPTS.InadequateSupplies.uuid, display: CONCEPTS.InadequateSupplies.display },
    { uuid: CONCEPTS.NeedsAdherenceCounseling.uuid, display: CONCEPTS.NeedsAdherenceCounseling.display },
  ],
  'reasonForTesting': [
    { uuid: CONCEPTS.Routine.uuid, display: CONCEPTS.Routine.display },
    { uuid: CONCEPTS.Confirmatory.uuid, display: CONCEPTS.Confirmatory.display },
    { uuid: CONCEPTS.Target.uuid, display: CONCEPTS.Target.display },
  ],
  'eidHivTestType': [
    { uuid: CONCEPTS.HIV_RAPID_TEST.uuid, display: CONCEPTS.HIV_RAPID_TEST.display },
    { uuid: CONCEPTS.HIV_DNA_PCR_TEST.uuid, display: CONCEPTS.HIV_DNA_PCR_TEST.display }
  ],
  'dnaPcrReasonForTesting': [
    { uuid: CONCEPTS.SixWeeksRoutine.uuid, display: CONCEPTS.SixWeeksRoutine.display },
    { uuid: CONCEPTS.Confirmatory.uuid, display: CONCEPTS.Confirmatory.display }
  ],
  'ReasonForNoDnaPcrResult': [
    { uuid: CONCEPTS.Contaminated.uuid, display: CONCEPTS.Contaminated.display },
    { uuid: CONCEPTS.UnsatisfactorySample.uuid, display: CONCEPTS.UnsatisfactorySample.display },
    { uuid: CONCEPTS.EquipmentFailure.uuid, display: CONCEPTS.EquipmentFailure.display },
    { uuid: CONCEPTS.InappropriateSampleContainer.uuid, display: CONCEPTS.InappropriateSampleContainer.display },
    { uuid: CONCEPTS.UnavailableSupplies.uuid, display: CONCEPTS.UnavailableSupplies.display },
    { uuid: CONCEPTS.Other.uuid, display: CONCEPTS.Other.display },
  ],
  'labLocation': [
    { uuid: CONCEPTS.NenoGeneXpert.uuid, display: CONCEPTS.NenoGeneXpert.display },
    { uuid: CONCEPTS.CentralLaboratory.uuid, display: CONCEPTS.CentralLaboratory.display },
    { uuid: CONCEPTS.LisungwiGeneXpert.uuid, display: CONCEPTS.LisungwiGeneXpert.display },
  ],
  'sputumLabLocation': [
    { uuid: CONCEPTS.NenoGeneXpert.uuid, display: CONCEPTS.NenoGeneXpert.display },
    { uuid: CONCEPTS.LisungwiGeneXpert.uuid, display: CONCEPTS.LisungwiGeneXpert.display },
    { uuid: CONCEPTS.microscopy.uuid, display: CONCEPTS.microscopy.display },
  ],
  "hivTestResultAnswers": [
    { uuid: CONCEPTS.HIV_TEST_RESULTS.Reactive.uuid, display: CONCEPTS.HIV_TEST_RESULTS.Reactive.display },
    { uuid: CONCEPTS.HIV_TEST_RESULTS.Non_Reactive.uuid, display: CONCEPTS.HIV_TEST_RESULTS.Non_Reactive.display },
    { uuid: CONCEPTS.HIV_TEST_RESULTS.Not_Done.uuid, display: CONCEPTS.HIV_TEST_RESULTS.Not_Done.display },
  ],
  'adherenceSession': [
    {
      uuid: CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.FirstSession.uuid,
      display: CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.FirstSession.display
    },
    {
      uuid: CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.SecondSession.uuid,
      display: CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.SecondSession.display
    },
    {
      uuid: CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.ThirdSession.uuid,
      display: CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.ThirdSession.display
    },
  ],
  'coughPresent': [
    { uuid: CONCEPTS.TB.Cough.uuid, display: 'Yes' }
  ],
  'coughAbsent': [
    { uuid: CONCEPTS.TB.Cough.uuid, display: 'No' }
  ],
  'feverPresent': [
    { uuid: CONCEPTS.TB.Fever.uuid, display: 'Yes' }
  ],
  'feverAbsent': [
    { uuid: CONCEPTS.TB.Fever.uuid, display: 'No' }
  ],
  'nightSweatPresent': [
    { uuid: CONCEPTS.TB.NightSweats.uuid, display: 'Yes' }
  ],
  'nightSweatAbsent': [
    { uuid: CONCEPTS.TB.NightSweats.uuid, display: 'No' }
  ],
  'weightLossPresent': [
    { uuid: CONCEPTS.TB.WeightLoss.uuid, display: 'Yes' }
  ],
  'weightlossAbsent': [
    { uuid: CONCEPTS.TB.WeightLoss.uuid, display: 'No' }
  ],
  'recentContactWithActiveTBPresent': [
    { uuid: CONCEPTS.TB.RecentContactWithActiveTB.uuid, display: 'Yes' }
  ],
  'recentContactWithActiveTBAbsent': [
    { uuid: CONCEPTS.TB.RecentContactWithActiveTB.uuid, display: 'No' }
  ],
  'painfulNeckAndArmpitLymphTBPresent': [
    { uuid: CONCEPTS.TB.PainfulNeckAndArmpitLymphNodes.uuid, display: 'Yes' }
  ],
  'painfulNeckAndArmpitLymphTBAbsent': [
    { uuid: CONCEPTS.TB.PainfulNeckAndArmpitLymphNodes.uuid, display: 'No' }
  ],
  'breastfeedingAnswers': [
    { uuid: CONCEPTS.ExclusiveBreastfeeding.uuid, display: CONCEPTS.ExclusiveBreastfeeding.display },
    { uuid: CONCEPTS.MixedFeeding.uuid, display: CONCEPTS.MixedFeeding.display },
    { uuid: CONCEPTS.ComplimentaryBreastfeeding.uuid, display: CONCEPTS.ComplimentaryBreastfeeding.display },
    { uuid: CONCEPTS.StoppedBreastfeeding.InLastSixWeeks.uuid, display: CONCEPTS.StoppedBreastfeeding.InLastSixWeeks.display },
    { uuid: CONCEPTS.StoppedBreastfeeding.OverSixWeeks.uuid, display: CONCEPTS.StoppedBreastfeeding.OverSixWeeks.display }
  ]
};

export const NAV_MENU_PAGES = {
  '/' : { display : 'Home', icon : 'home' },
  '/searchPatient' : { display : 'Search Patient', icon : 'search' },
  '/allPatient/allPatientQueue': { display: 'All-Patients', icon: 'notes-medical' },
  '/checkin/checkInQueue': { display: 'Check-In', icon: 'notes-medical' },
  '/screening/vl/queue': { display: 'Viral Load', icon: 'vial' },
  '/screening/tb/queue': { display: 'Tuberculosis', icon: 'vial' },
  '/screening/adherence/queue' : { display : 'Adherence', icon : 'pills' },
  '/screening/eid/queue': { display: 'EID', icon: 'child' },
  '/screening/nutrition/queue' : { display : 'Nutrition', icon : 'lemon' },
  '/screening/bloodPressure/queue' : { display : 'Blood Pressure', icon : 'heart' },
  '/screening/htc/queue' : { display : 'HTC', icon : 'ribbon' },
  '/screening/nurse/queue' : { display : 'Nurse', icon : 'user-md' },
  '/screening/clinician/queue': { display : 'Clinician' }
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

export const ALERTS_CATEGORIES = {
  VIRAL_LOAD_ALERT: "viral-load",
  HTC_ALERT: "htc",
  BP_ALERT: "bp",
  NUTRITION_ALERT: "nutrition",
  TB_ALERT: "tb",
  EID_ALERT: "eid",
  ADHERENCE_ALERT: "adherence",
  SPUTUM_ALERT: "sputum",
  SCREENING_ELIGIBILITY_ALERT: "screening-eligibility"
};

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
