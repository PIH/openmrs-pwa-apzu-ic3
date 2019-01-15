import React from "react";
import PatientLabTests from "../../patient/PatientLabTests";
import { CONCEPTS } from "../../constants";
import { ObsHistory } from "@openmrs/react-components";

const TBTestSummary = props => {
  return (
    <div>
      <PatientLabTests test_type={ "tb_test" } />
      <ObsHistory
        concepts={[CONCEPTS.Bled,
          CONCEPTS.ReasonForNoSample,
          CONCEPTS.ReasonForTesting,
          CONCEPTS.LabLocation
        ]}
      />
    </div>
  );
};

export default TBTestSummary;
