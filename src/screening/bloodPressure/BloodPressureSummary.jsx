import React from "react";
import {EncounterHistory} from '@openmrs/react-components';
import {ENCOUNTER_TYPES} from "../../constants";

const BloodPressureSummary = props => {
  return (
    <EncounterHistory
      encounterType={ENCOUNTER_TYPES.BloodPressureEncounterType}
    />
  );
};

export default BloodPressureSummary;
