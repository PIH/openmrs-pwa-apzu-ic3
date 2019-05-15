import React from "react";
import {formActions, ObsHistory} from '@openmrs/react-components';
import {CONCEPTS, ENCOUNTER_TYPES} from "../../constants";

const BloodPressureSummary = props => {
  return (
    <ObsHistory
      concepts={[CONCEPTS.DiastolicBloodPressure, CONCEPTS.SystolicBloodPressure]}
      editableEncounterTypes={[ENCOUNTER_TYPES.BloodPressureEncounterType]}
      onEditEncounterActionCreators={[
        (encounterUuid) => formActions.loadFormBackingEncounter(props.formInstanceId, encounterUuid)
      ]}
      onEditEncounterCallbacks={[
        props.gotoForm
      ]}
    />
  );
};

export default BloodPressureSummary;
