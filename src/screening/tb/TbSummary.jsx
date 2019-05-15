import React from "react";
import {CONCEPTS, ENCOUNTER_TYPES} from "../../constants";
import {formActions, ObsHistory} from "@openmrs/react-components";

const TbSummary = props => {
  return (
    <div>
      <ObsHistory
        concepts={[CONCEPTS.TB.SymptomPresent,
          CONCEPTS.TB.SymptomAbsent]}
        groupingConcepts={[CONCEPTS.TB.TuberculosisScreeningSet]}
        reverseLabelAndValue={true}
        editableEncounterTypes={[ENCOUNTER_TYPES.TBScreeningEncounterType]}
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

export default TbSummary;
