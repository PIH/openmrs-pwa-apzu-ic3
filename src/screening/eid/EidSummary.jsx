import React from "react";
import {ObsHistory} from "@openmrs/react-components";
import {CONCEPTS} from "../../constants";

const EidSummary = props => {
  return (
    <span>
      <ObsHistory
        concepts={[
          CONCEPTS.HIV_TEST_TYPE,
          CONCEPTS.SampleCollected,
          CONCEPTS.ReasonForNoSample,
          CONCEPTS.ReasonForTesting,
          CONCEPTS.LabLocation,
          CONCEPTS.HIV_TEST_RESULTS,
          CONCEPTS.BreastFeeding,
        ]}
        groupingConcepts={[CONCEPTS.HIV_TEST_CONSTRUCT]}
      />
    </span>
  );
};

export default EidSummary;
