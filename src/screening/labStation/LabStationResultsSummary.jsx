import React from "react";
import { formActions, ObsHistory } from '@openmrs/react-components';
import { CONCEPTS, ENCOUNTER_TYPES } from "../../constants";

const LabStationResultsSummary = props => {
  return (
    <div className="single-summary-content">
      <ObsHistory
        concepts={[
          CONCEPTS.CREATININE,
          CONCEPTS.HbA1c
        ]}
        editableEncounterTypes={[ENCOUNTER_TYPES.LabStationResultsEncounterType]}
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

export default LabStationResultsSummary;
