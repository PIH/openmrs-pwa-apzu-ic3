import React from "react";
import {CONCEPTS} from "../../constants";
import {ObsHistory} from "@openmrs/react-components";

const NutritionSummary = props => {
  return (
    <ObsHistory
      concepts={[CONCEPTS.Height, CONCEPTS.Weight, CONCEPTS.MUAC]}
    />
  );
};

export default NutritionSummary;
