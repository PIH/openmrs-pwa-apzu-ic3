import React from "react";
import { ObsHistory } from '@openmrs/react-components';
import { CONCEPTS } from "../../constants";

const EidSummary = props => {
  return (
    <span>
      <ObsHistory
        concepts={[CONCEPTS.HIV_TEST_TYPE,
          CONCEPTS.Bled,
          CONCEPTS.ReasonForNoSample,
          CONCEPTS.ReasonForTesting,
          CONCEPTS.LabLocation,
          CONCEPTS.HIV_TEST_RESULTS
        ]}
      />
    </span>
  );
};

export default EidSummary;
