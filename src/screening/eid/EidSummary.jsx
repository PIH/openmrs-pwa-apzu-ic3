import React from "react";
import {formActions, formUtil, ObsHistory} from "@openmrs/react-components";
import {CONCEPTS, ENCOUNTER_TYPES} from "../../constants";

const EidSummary = props => {
  return (
    <span>
      <ObsHistory
        concepts={[
          CONCEPTS.HIV_TEST_TYPE,
          CONCEPTS.SampleCollected,
          CONCEPTS.ReasonForNoSample,
          CONCEPTS.ReasonForTesting,
          CONCEPTS.LabLocation,
          CONCEPTS.HIV_TEST_RESULTS,
          CONCEPTS.BreastFeeding,
        ]}
        // hack: some of the EID encounters are entered via the flowsheets, and currently uneditable here because they don't include the form and path; need to make sure we don't show an edit link
        editableFunc={(encounter, obs) => obs.some((o) => formUtil.hasFormAndPath(o))}
        editableEncounterTypes={[ENCOUNTER_TYPES.EidEncounterType]}
        groupingConcepts={[CONCEPTS.HIV_TEST_CONSTRUCT]}
        onEditEncounterActionCreators={[
          (encounterUuid) => formActions.loadFormBackingEncounter(props.formInstanceId, encounterUuid)
        ]}
        onEditEncounterCallbacks={[
          props.gotoForm
        ]}
      />
    </span>
  );
};

export default EidSummary;
