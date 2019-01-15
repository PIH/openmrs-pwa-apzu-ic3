import React from "react";
import {CONCEPTS} from "../../constants";
import {ObsHistory} from "@openmrs/react-components";

const TBTestSummary = props => {
  return (
    <ObsHistory
      concepts={[
        CONCEPTS.TBTestType,
        CONCEPTS.GeneXpert,
        CONCEPTS.Smear,
        CONCEPTS.RifampinResistance,
        CONCEPTS.ReasonForNoResult
      ]}
    />
  );
};

export default TBTestSummary;
