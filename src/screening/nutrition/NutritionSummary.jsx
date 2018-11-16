import React from "react";
import {ENCOUNTER_TYPES} from "../../constants";
import {EncounterHistory} from "@openmrs/react-components";

const NutritionSummary = props => {
  return (
    <EncounterHistory
      encounterType={ENCOUNTER_TYPES.NutritionEncounterType}
    />
  );
};

export default NutritionSummary;
