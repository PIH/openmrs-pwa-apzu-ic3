import React from "react";
import {CONCEPTS} from "../../constants";
import {ObsHistory} from "@openmrs/react-components";

const SputumSummary = props => {

  return (
    <span>
      <ObsHistory
        concepts={[
          CONCEPTS.SampleCollected,
          CONCEPTS.LabLocation,
          CONCEPTS.SampleQuality
        ]}
        groupingConcepts={[CONCEPTS.TbTest.TuberculosisTestScreeningSet]}
      />
    </span>
  );
};

export default SputumSummary;
