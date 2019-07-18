import React from "react";
import { connect } from 'react-redux';
import {
  ProgramEnrollment,
  selectors,
  formActions,
  EncounterHistory
} from '@openmrs/react-components';
import { uniqBy, prop } from "ramda";

import { CONCEPTS, ENCOUNTER_TYPES  } from "../../constants";
import ChronicCareDiagnoses from '../clinician/ChronicCareDiagnoses';

const NurseSummary = (props) => {

  return (
    <div className="summary-content">
      <div className="left-summary-content">
        <span className="patient-alert">
          { (props.patient != null && (typeof props.patient !== 'undefined') && props.patient.alert != null && (typeof props.patient.alert !== 'undefined')) ? uniqBy(prop('alert'))(props.patient.alert).map((alert) => (
            <span key={alert.name}>{alert.alert}</span>
          )) : <span></span> }
        </span>
      </div>
      <div className="right-summary-content nursing-summary-right-content">
        <ProgramEnrollment />
        <ChronicCareDiagnoses />
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

export default connect(mapStateToProps)(NurseSummary);


