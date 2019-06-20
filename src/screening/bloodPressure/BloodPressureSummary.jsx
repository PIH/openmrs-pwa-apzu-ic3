import React from "react";
import { formActions, ObsHistory } from '@openmrs/react-components';
import { CONCEPTS, ENCOUNTER_TYPES } from "../../constants";

const BloodPressureSummary = props => {
  return (
    <div className="single-summary-content">
      <ObsHistory
        concepts={[CONCEPTS.SystolicBloodPressure, CONCEPTS.DiastolicBloodPressure]}
        editableEncounterTypes={[ENCOUNTER_TYPES.BloodPressureEncounterType]}
        onEditEncounterActionCreators={[
          (encounterUuid) => formActions.loadFormBackingEncounter(props.formInstanceId, encounterUuid)
        ]}
        onEditEncounterCallbacks={[
          props.gotoForm
        ]}
      />
    </div>
  );
};

export default BloodPressureSummary;
