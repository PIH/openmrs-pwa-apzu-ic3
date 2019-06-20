import React from "react";
import { CONCEPTS, ENCOUNTER_TYPES } from "../../constants";
import { EncounterHistory, formActions } from "@openmrs/react-components";

const TbTestSummary = props => {
  return (
    <div className="single-summary-content">
      <span>
        <EncounterHistory
          concepts={[
            CONCEPTS.TBTestType,
            CONCEPTS.GeneXpert,
            CONCEPTS.Smear,
            CONCEPTS.RifampinResistance,
            CONCEPTS.ReasonForNoResult,
            CONCEPTS.ReasonForNoSample,
            CONCEPTS.NextSteps
          ]}
          editable
          encounterType={ENCOUNTER_TYPES.TBTestResults}
          onEditActionCreators={[
            (encounterUuid) => formActions.loadFormBackingEncounter(props.formInstanceId, encounterUuid)
          ]}
          onEditCallbacks={[
            props.gotoForm
          ]}
        />
      </span>
    </div>
  );
};

export default TbTestSummary;
