import React from "react";
import {formActions, ObsHistory} from '@openmrs/react-components';
import {CONCEPTS, ENCOUNTER_TYPES} from "../../constants";

const HtcSummary = props => {
  return (
    <div>
      <ObsHistory
        concepts={[
          CONCEPTS.HIV_TEST_TYPE,
          CONCEPTS.SampleCollected,
          CONCEPTS.ReasonForNoSample,
          CONCEPTS.ReasonForTesting,
          CONCEPTS.LabLocation,
          CONCEPTS.HIV_TEST_RESULTS
        ]}
        groupingConcepts={[CONCEPTS.HIV_TEST_CONSTRUCT]}
        editableEncounterTypes={[ENCOUNTER_TYPES.HTCEncounterType]}
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

export default HtcSummary;
