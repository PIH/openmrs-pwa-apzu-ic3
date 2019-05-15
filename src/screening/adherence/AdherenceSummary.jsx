import React from "react";
import {CONCEPTS, ENCOUNTER_TYPES} from "../../constants";
import {formActions, ObsHistory} from "@openmrs/react-components";

const AdherenceSummary = props => {
  return (
    <div>
      {/* <PatientLabTests test_type={ "viral_load_tests" }/>*/}
      <ObsHistory
        concepts={[CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession,
          CONCEPTS.ADHERENCE_COUNSELING.NameOfCounselor,
          CONCEPTS.ADHERENCE_COUNSELING.CounseledOnPillCounts,
          CONCEPTS.ADHERENCE_COUNSELING.DrugAdherencePercentage,
          CONCEPTS.ADHERENCE_COUNSELING.CounseledOnViralLoad,
          CONCEPTS.ADHERENCE_COUNSELING.MissedDosesLastWeek
        ]}
        editableEncounterTypes={[ENCOUNTER_TYPES.AdherenceCounselingEncounterType]}
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

export default AdherenceSummary;
