import React from "react";
import { formActions, ObsHistory } from '@openmrs/react-components';
import { CONCEPTS, ENCOUNTER_TYPES } from "../../constants";

const BloodSugarTestSummary = props => {
  return (
    <div className="single-summary-content">
      <ObsHistory
        concepts={[
          CONCEPTS.FS_BLOOD_SUGAR_TEST_TYPE,
          CONCEPTS.RANDOM_BLOOD_GLUCOSE
        ]}
        groupingConcepts={[CONCEPTS.BLOOD_SUGAR_TEST_SET]}
        editableEncounterTypes={[ENCOUNTER_TYPES.BloodSugarScreeningEncounterType]}
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

export default BloodSugarTestSummary;
