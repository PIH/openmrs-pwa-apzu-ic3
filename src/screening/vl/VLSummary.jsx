import React from "react";
import {CONCEPTS, ENCOUNTER_TYPES} from "../../constants";
import {formActions, ObsHistory, formUtil} from "@openmrs/react-components";

const VLSummary = props => {
  return (
    <div>
      <ObsHistory
        concepts={
          [
            CONCEPTS.ViralLoad,
            CONCEPTS.ViralLoadLowerThanDetectionLimit,
            CONCEPTS.ViralLoadLessThanLimit,
            CONCEPTS.ViralLoadLowerThanDetectionLimit,
            CONCEPTS.Bled,
            CONCEPTS.ReasonForNoSample,
            CONCEPTS.ReasonForTesting,
            CONCEPTS.LabLocation,
            CONCEPTS.ReasonForNoResult,
            CONCEPTS.ViralLoadDetectablelowerLimit
          ]}
        editableEncounterTypes={[ENCOUNTER_TYPES.VLEncounterType]}
        // hack: some of the VL encounters are entered via the flowsheets, and currently uneditable here because they don't include the form and path; need to make sure we don't show an edit link
        editableFunc={(encounter, obs) => obs.some((o) => formUtil.hasFormAndPath(o))}
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
