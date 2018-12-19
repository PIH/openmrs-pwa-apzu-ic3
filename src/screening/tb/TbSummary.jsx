import React from "react";
import { ENCOUNTER_TYPES } from "../../constants";
import { EncounterHistory } from "@openmrs/react-components";

const TbSummary = props => {
  return (
    <EncounterHistory
      encounterType={ENCOUNTER_TYPES.TBScreeningEncounterType}
    />
  );
};

export default TbSummary;
