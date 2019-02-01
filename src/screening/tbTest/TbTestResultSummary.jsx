import React from "react";
import {CONCEPTS} from "../../constants";
import {ObsHistory} from "@openmrs/react-components";

const TbTestResultSummary = props => {
  return (
    <ObsHistory
      concepts={[
        CONCEPTS.TBTestType,
        CONCEPTS.GeneXpert,
        CONCEPTS.Smear,
        CONCEPTS.RifampinResistance,
        CONCEPTS.ReasonForNoResult,
        CONCEPTS.SampleCollected,
        CONCEPTS.LabLocation,
        CONCEPTS.SampleQuality,
      ]}
    />
  );
};

export default TbTestResultSummary;
