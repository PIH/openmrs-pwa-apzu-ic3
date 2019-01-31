import React from "react";
import { CONCEPTS } from "../../constants";
import { ObsHistory } from "@openmrs/react-components";

const SputumSummary = props => {
  return (
    <div>
      <ObsHistory
        concepts={[CONCEPTS.SputumReceived,
          CONCEPTS.LabLocation,
          CONCEPTS.SampleQuality,
        ]}
      />
    </div>
  );
};

export default SputumSummary;
