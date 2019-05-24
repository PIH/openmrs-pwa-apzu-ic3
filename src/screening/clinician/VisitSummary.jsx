import React from "react";
import { connect } from "react-redux";
import * as R from 'ramda';
import { parse } from 'date-fns';
import {
  ObsHistory,
  selectors,
  formUtil,
} from '@openmrs/react-components';
import { CONCEPTS } from "../../constants";

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
      CONCEPTS.Clinical.OtherOutcome,
      CONCEPTS.ReferToScreeningStation
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
    screeningType: "TB Screening",
    concepts: [
      CONCEPTS.TB.SymptomPresent,
      CONCEPTS.TB.SymptomAbsent
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
  


const VisitSummary = props => {

  // TODO move this into util method?

  let obs = [];
  if (props.patient && props.patient.visit && props.patient.visit.encounters) {
    obs = props.patient.visit.encounters
      .sort((enc1, enc2) => {
        return parse(enc2.encounterDatetime) - parse(enc1.encounterDatetime);
      }) // make sure most recent first
      .reduce((acc, encounter) => {
        return [...acc, ...encounter.obs];
      }, []);
  }

  obs = formUtil.flattenObs(obs)
    .filter((o) => (o.value !== null));

  return (
    <div>
      <h4><u>Visit Summary</u></h4>
      {orderedSummary.map((summary, index) => {
        // note that this will only take the *first* obs mapped to each concept... since we sorting encounters above, this should be the most recent
        let mappedObs = [];

        // just incase we need to add more types with reversed labels, we just put it in the array
        const reversedScreeningTypes = ['TB Screening'];

        summary.concepts.forEach((concept) => {
          const matchedObs = obs.filter(o => o.concept.uuid === concept.uuid);
          mappedObs = mappedObs.concat(matchedObs);
        });
        let obsHistory = R.filter(R.identity)(mappedObs);
        if (summary.screeningType === "Nutrition" && obsHistory.length > 0) {
          const encounterUuid = obsHistory[0].encounter.uuid;
          obsHistory = props.nutritionHistory.filter(h => h.encounter && h.encounter.uuid === encounterUuid);
        };


        return (
          <span
            key={index}
            style={{ paddingBottom: 5 }}
          >
            {!R.isEmpty(obsHistory) && <h4>{summary.screeningType} Information</h4>}
            <span
              style={{ position: 'relative', left: 20 }}
            >
              <ObsHistory
                concepts={summary.concepts}
                key={index}
                obs={obsHistory}
                reverseLabelAndValue={reversedScreeningTypes.includes(summary.screeningType)}
                showDates={false}
              />
            </span>
          </span>
        );
      })
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
    nutritionHistory: state.patientNutrition.history,
  };
};

export default connect(mapStateToProps)(VisitSummary);


