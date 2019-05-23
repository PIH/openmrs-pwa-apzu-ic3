import React from "react";
import {
  EncounterHistory,
  ProgramEnrollment,
  formActions
} from '@openmrs/react-components';
import ChronicCareDiagnoses from './ChronicCareDiagnoses';
import { CONCEPTS, ENCOUNTER_TYPES  } from "../../constants";
import VisitSummary from "./VisitSummary";


const ClinicianSummary = props => {

  return (
    <div>
      <ProgramEnrollment />
      <ChronicCareDiagnoses />
      <VisitSummary />
      <h4><u>Clinician History</u></h4>
      <span
        style={{ position: 'relative', left: 20 }}
      >
        <EncounterHistory
          concepts={[CONCEPTS.Clinical.ClinicalNotes,
            CONCEPTS.Clinical.Outcome,
            CONCEPTS.Clinical.NextAppointmentDate,
            CONCEPTS.Clinical.QualitativeTime,
            CONCEPTS.Clinical.TransferFacility,
            CONCEPTS.Clinical.ReasonToStopCare,
            CONCEPTS.Clinical.OtherOutcome,
            CONCEPTS.ReferToScreeningStation
          ]}
          editable
          encounterType={ENCOUNTER_TYPES.ClinicalPlan}
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

export default ClinicianSummary;
