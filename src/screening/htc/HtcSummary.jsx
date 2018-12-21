import React from "react";
import {CONCEPTS} from "../../constants";
import PatientLabTests from "../../patient/PatientLabTests";
import {ObsHistory} from "@openmrs/react-components";

const HtcSummary = props => {
  return (
    <div>
      <PatientLabTests test_type={ "hiv_tests" }/>
      <ObsHistory
        concepts={[CONCEPTS.HIV_TEST_RESULTS]}
      />
    </div>
  );
};

export default HtcSummary;
