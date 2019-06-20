import React from "react";
import { connect } from 'react-redux';
import {
  EncounterHistory,
  ProgramEnrollment,
  formActions,
  selectors
} from '@openmrs/react-components';
import { uniqBy, prop } from "ramda";
import ChronicCareDiagnoses from './ChronicCareDiagnoses';
import { CONCEPTS, ENCOUNTER_TYPES  } from "../../constants";
import VisitSummary from "./VisitSummary";


const ClinicianSummary = props => {

  return (
    <div className="summary-content">
      <div className="left-summary-content">
        <span className="patient-alert">
          {uniqBy(prop('alert'))(props.patient.alert).map((alert) => (
            <span key={alert.name}>{alert.alert}</span>
          ))}
        </span>
      </div>
      <div className="right-summary-content nursing-summary-right-content">

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
              CONCEPTS.PersonPresentAtVisit,
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state)
  };
};

export default connect(mapStateToProps)(ClinicianSummary);
