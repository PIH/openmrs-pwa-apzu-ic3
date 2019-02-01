import React from "react";
import {CONCEPTS} from "../../constants";
import {ObsHistory} from "@openmrs/react-components";

const AdherenceSummary = props => {
  return (
    <div>
      {/* <PatientLabTests test_type={ "viral_load_tests" }/>*/}
      <ObsHistory
        concepts={[CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession,
          CONCEPTS.ADHERENCE_COUNSELING.NameOfCounselor,
          CONCEPTS.ADHERENCE_COUNSELING.CounseledOnPillCounts,
          CONCEPTS.ADHERENCE_COUNSELING.DrugAdherencePercentage,
          CONCEPTS.ADHERENCE_COUNSELING.CounseledOnViralLoad
        ]}
      />
    </div>
  );
};

export default AdherenceSummary;
