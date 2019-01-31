import React from "react";
import PatientLabTests from "../../patient/PatientLabTests";
import {CONCEPTS} from "../../constants";
import {ObsHistory} from "@openmrs/react-components";

const VLSummary = props => {
  return (
    <div>
      <ObsHistory
        concepts={
          [
            CONCEPTS.ViralLoadResult,
            CONCEPTS.ViralLoadLowerThanDetectionLimit,
            CONCEPTS.Bled,
            CONCEPTS.ReasonForNoSample,
            CONCEPTS.ReasonForTesting,
            CONCEPTS.LabLocation
          ]}
      />
    </div>
  );
};

export default VLSummary;
