import React from "react";
import PatientLabTests from "../../patient/PatientLabTests";
import { CONCEPTS } from "../../constants";
import { ObsHistory } from "@openmrs/react-components";

const TbSummary = props => {
  return (
    <div>
      <ObsHistory
        concepts={[CONCEPTS.SymptomPresent,
          CONCEPTS.SymptomAbsent]}
      />
    </div>
  );
};

export default TbSummary;
