import React from "react";
import { CONCEPTS } from "../../constants";
import { ObsHistory } from "@openmrs/react-components";

const TbSummary = props => {
  return (
    <div>
      <ObsHistory
        concepts={[CONCEPTS.SymptomPresent,
          CONCEPTS.SymptomAbsent]}
        reverseLabelAndValue={true}
      />
    </div>
  );
};

export default TbSummary;
