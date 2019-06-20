import React from "react";
import { CONCEPTS, ENCOUNTER_TYPES } from "../../constants";
import { formActions, ObsHistory } from "@openmrs/react-components";

const TbSummary = props => {
  return (
    <div className="single-summary-content">
      <ObsHistory
        concepts={[CONCEPTS.TB.SymptomPresent,
          CONCEPTS.TB.SymptomAbsent]}
        editableEncounterTypes={[ENCOUNTER_TYPES.TBScreeningEncounterType]}
        groupingConcepts={[CONCEPTS.TB.TuberculosisScreeningSet]}
        onEditEncounterActionCreators={[
          (encounterUuid) => formActions.loadFormBackingEncounter(props.formInstanceId, encounterUuid)
        ]}
        onEditEncounterCallbacks={[
          props.gotoForm
        ]}
        reverseLabelAndValue
      />
    </div>
  );
};

export default TbSummary;
