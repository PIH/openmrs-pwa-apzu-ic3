import React from "react";
import {EncounterHistory} from '@openmrs/react-components';
import {ENCOUNTER_TYPES} from "../../constants";

const EidSummary = props => {
  return (
    <span>
      <EncounterHistory
        encounterType={ENCOUNTER_TYPES.DnaPcrEncounterType}
      />
      <EncounterHistory
        encounterType={ENCOUNTER_TYPES.HTCEncounterType}
      />
    </span>
  );
};

export default EidSummary;
