import React from "react";
import {formActions, ObsHistory} from "@openmrs/react-components";
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
