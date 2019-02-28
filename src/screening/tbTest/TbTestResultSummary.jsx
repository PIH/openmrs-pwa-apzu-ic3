import React from "react";
import {CONCEPTS, ENCOUNTER_TYPES} from "../../constants";
import {EncounterHistory, formActions} from "@openmrs/react-components";

const TbTestResultSummary = props => {
  return (
    <span>
      <EncounterHistory
        concepts={[
          CONCEPTS.TBTestType,
          CONCEPTS.GeneXpert,
          CONCEPTS.Smear,
          CONCEPTS.RifampinResistance,
          CONCEPTS.ReasonForNoResult
        ]}
        encounterType={ENCOUNTER_TYPES.TBTestResults}
        editable={true}
        onEditActionCreators={[
          (encounterUuid) => formActions.loadFormBackingEncounter(props.formInstanceId, encounterUuid)
        ]}
        onEditCallbacks={[
          props.goNext
        ]}
      />
    </span>
  );
};

export default TbTestResultSummary;
