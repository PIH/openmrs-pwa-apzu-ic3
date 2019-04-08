import React from "react";
import {CONCEPTS, ENCOUNTER_TYPES} from "../../constants";
import {formActions, ObsHistory} from "@openmrs/react-components";

const VLSummary = props => {
  return (
    <div>
      <ObsHistory
        concepts={
          [
            CONCEPTS.ViralLoad,
            CONCEPTS.ViralLoadLowerThanDetectionLimit,
            CONCEPTS.Bled,
            CONCEPTS.ReasonForNoSample,
            CONCEPTS.ReasonForTesting,
            CONCEPTS.LabLocation,
            CONCEPTS.HIVViralLoadStatus,
            CONCEPTS.ViralLoadDetectablelowerLimit,
            CONCEPTS.ViralLoadLowerThanDetectionLimit,
            CONCEPTS.ViralLoadLessThanLimit,
          ]}
        editableEncounterTypes={[ENCOUNTER_TYPES.VLEncounterType]}
        groupingConcepts={[CONCEPTS.ViralLoadTestSet]}
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

export default VLSummary;
