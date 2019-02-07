import React from "react";
import {connect} from "react-redux";
import {ObsHistory, ProgramEnrollment, selectors, formUtil } from '@openmrs/react-components';
import ChronicCareDiagnoses from './ChronicCareDiagnoses';
import {CONCEPTS} from "../../constants";

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
      <ObsHistory
        concepts={[
          CONCEPTS.Weight,
          CONCEPTS.Height,
          CONCEPTS.BMI,
          CONCEPTS.Pregnant,
          CONCEPTS.MUAC,
          CONCEPTS.DiastolicBloodPressure,
          CONCEPTS.SystolicBloodPressure,
          CONCEPTS.ViralLoadResult,
          CONCEPTS.ViralLoadLowerThanDetectionLimit,
          CONCEPTS.Bled,
          CONCEPTS.ReasonForNoSample,
          CONCEPTS.ReasonForTesting,
          // CONCEPTS.LabLocation,
          CONCEPTS.HIV_TEST_TYPE,
          CONCEPTS.SampleCollected,
          CONCEPTS.ReasonForNoSample,
          CONCEPTS.ReasonForTesting,
          // CONCEPTS.LabLocation,
          CONCEPTS.HIV_TEST_RESULTS,
          CONCEPTS.TBTestType,
          CONCEPTS.GeneXpert,
          CONCEPTS.Smear,
          CONCEPTS.RifampinResistance,
          CONCEPTS.ReasonForNoResult,
          // CONCEPTS.SampleCollected,
          CONCEPTS.LabLocation,
          CONCEPTS.SampleQuality,
          CONCEPTS.TB.SymptomPresent,
          CONCEPTS.TB.SymptomAbsent,
          CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession,
          CONCEPTS.ADHERENCE_COUNSELING.NameOfCounselor,
          CONCEPTS.ADHERENCE_COUNSELING.CounseledOnPillCounts,
          CONCEPTS.ADHERENCE_COUNSELING.DrugAdherencePercentage,
          CONCEPTS.ADHERENCE_COUNSELING.CounseledOnViralLoad
        ]}
        obs={obs}
        showDates={false}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state)
  };
};

export default connect(mapStateToProps)(ClinicianSummary);


