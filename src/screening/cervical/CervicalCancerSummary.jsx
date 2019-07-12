import React from "react";
import { formActions, ObsHistory } from '@openmrs/react-components';
import { CONCEPTS, ENCOUNTER_TYPES } from "../../constants";

const CervicalCancerSummary = props => {
  return (
    <div className="single-summary-content">
      <ObsHistory
        concepts={[
          CONCEPTS.CERVICAL_CANCER_SCREENING_RESULTS,
          CONCEPTS.BIOPSY_DONE,
          CONCEPTS.Clinical.ClinicalNotes
        ]}
        groupingConcepts={[CONCEPTS.CERVICAL_CANCER_SCREENING_CONSTRUCT]}
        editableEncounterTypes={[ENCOUNTER_TYPES.CervicalCancerScreeningEncounterType]}
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

export default CervicalCancerSummary;
