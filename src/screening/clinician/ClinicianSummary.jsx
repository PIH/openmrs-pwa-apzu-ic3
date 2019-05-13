import React from "react";
import {connect} from "react-redux";
import * as R from 'ramda';
import {ObsHistory, ProgramEnrollment, selectors, formUtil } from '@openmrs/react-components';
import ChronicCareDiagnoses from './ChronicCareDiagnoses';
import {CONCEPTS} from "../../constants";

const orderedSummary = [
  {
    screeningType: "Clinician",
    concepts: [
      CONCEPTS.Clinical.ClinicalNotes,
      CONCEPTS.Clinical.Outcome,
      CONCEPTS.Clinical.NextAppointmentDate,
      CONCEPTS.Clinical.QualitativeTime,
      CONCEPTS.Clinical.TransferFacility,
      CONCEPTS.Clinical.ReasonToStopCare,
      CONCEPTS.Clinical.OtherOutcome
    ]
  },
  {
    screeningType: "Nutrition",
    concepts: [
      CONCEPTS.Weight,
      CONCEPTS.Height,
      CONCEPTS.BMI,
      CONCEPTS.Pregnant,
      CONCEPTS.MUAC
    ]
  },
  {
    screeningType: "Blood Pressure",
    concepts: [
      CONCEPTS.SystolicBloodPressure,
      CONCEPTS.DiastolicBloodPressure
    ]
  },
  {
    screeningType: "Viral Load",
    concepts: [
      CONCEPTS.ViralLoad,
      CONCEPTS.ViralLoadLowerThanDetectionLimit,
      CONCEPTS.Bled,
      CONCEPTS.ReasonForNoSample,
      CONCEPTS.ReasonForTesting,
      CONCEPTS.HIVViralLoadStatus,
      CONCEPTS.ViralLoadDetectablelowerLimit,
      CONCEPTS.ViralLoadLowerThanDetectionLimit,
      CONCEPTS.ViralLoadLessThanLimit,
    ]
  },
  {
    screeningType: "HIV Testing",
    concepts:  [
      CONCEPTS.HIV_TEST_TYPE,
      CONCEPTS.SampleCollected,
      CONCEPTS.ReasonForNoSample,
      CONCEPTS.ReasonForTesting,
      CONCEPTS.HIV_TEST_RESULTS,
    ]
  },
  {
    screeningType: "TB Test",
    concepts: [
      CONCEPTS.TBTestType,
      CONCEPTS.GeneXpert,
      CONCEPTS.Smear,
      CONCEPTS.RifampinResistance,
      CONCEPTS.ReasonForNoResult
    ]
  },
  {
    screeningType: "Adherence",
    concepts:  [
      CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession,
      CONCEPTS.ADHERENCE_COUNSELING.NameOfCounselor,
      CONCEPTS.ADHERENCE_COUNSELING.CounseledOnPillCounts,
      CONCEPTS.ADHERENCE_COUNSELING.DrugAdherencePercentage,
      CONCEPTS.ADHERENCE_COUNSELING.CounseledOnViralLoad,
      CONCEPTS.ADHERENCE_COUNSELING.MissedDosesLastWeek
    ],
  },
  {
    screeningType: "Check-In",
    concepts: [
      CONCEPTS.SOURCE_OF_REFERRAL,
      CONCEPTS.SOURCE_OF_REFERRAL.Linkage_to_care_ID
    ]
  }
];
  


const ClinicianSummary = props => {

  // TODO move this into util method?

  let obs = [];
  if (props.patient && props.patient.visit && props.patient.visit.encounters) {
    obs = props.patient.visit.encounters.reduce((acc, encounter) => {
      return [...acc, ...encounter.obs];
    }, []);
  }

  obs = formUtil.flattenObs(obs)
    .filter((o) => (o.value !== null));

  return (
    <div>
      <ProgramEnrollment />
      <ChronicCareDiagnoses />
      <h4><u>Visit Summary</u></h4>
      {orderedSummary.map((summary, index) => {
        const mappedObs = summary.concepts.map((concept) => obs.find(o => o.concept.uuid === concept.uuid));
        const obsHistory = R.filter(R.identity)(mappedObs);

        return (
          <span
            key={index}
            style={{ paddingBottom: 5 }}
          >
            {!R.isEmpty(obsHistory) && <h4>{summary.screeningType} Information</h4>}
            <ObsHistory
              concepts={summary.concepts}
              key={index}
              obs={obsHistory}
              showDates={false}
            />
          </span>
        );
      })
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state)
  };
};

export default connect(mapStateToProps)(ClinicianSummary);


