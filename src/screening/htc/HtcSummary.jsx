import React from "react";
import {ObsHistory} from '@openmrs/react-components';
import {CONCEPTS} from "../../constants";

const HtcSummary = props => {
  return (
    <div>
      <ObsHistory
        concepts={[
          CONCEPTS.HIV_TEST_TYPE,
          CONCEPTS.SampleCollected,
          CONCEPTS.ReasonForNoSample,
          CONCEPTS.ReasonForTesting,
          CONCEPTS.LabLocation,
          CONCEPTS.HIV_TEST_RESULTS
        ]}
        groupingConcepts={[CONCEPTS.HIV_TEST_CONSTRUCT]}
      />
    </div>
  );
};

export default HtcSummary;
