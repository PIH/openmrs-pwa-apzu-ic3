import React from "react";
import {EncounterFormPage, encountersByEncounterTypeFilter, visitActions} from '@openmrs/react-components';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ENCOUNTER_ROLES} from "../constants";

let ScreeningForm = props => {

  let encounter;

  // find any matching encounter in the active visit
  // TODO what if there are multiple encounters of the same type?  this currently just shifts in the "first"
  if (props.patient && props.patient.visit && props.patient.visit.encounters) {
    encounter = encountersByEncounterTypeFilter(props.encounterType.uuid)(props.patient.visit.encounters).shift();
  }

  // we want to update the active visit for the current patient on submit
  const formSubmittedActionCreators = [
    () => props.patient && props.patient.uuid && visitActions.fetchPatientActiveVisit(props.patient.uuid)
  ];

  return (
    <EncounterFormPage
      backLink={props.backLink}
      encounter={encounter}
      encounterRole={ENCOUNTER_ROLES.UnknownEncounterRole}
      encounterType={props.encounterType}
      formContent={props.formContent}
      formId={props.formId}
      formInstanceId={ props.formInstanceId }
      defaultValues={ props.defaultValues }
      formSubmittedActionCreators={formSubmittedActionCreators}
      title={props.title}
    />
  );
};

ScreeningForm.propTypes = {
  backLink: PropTypes.string,
  encounterType: PropTypes.object.isRequired,
  formContent: PropTypes.object.isRequired,
  formId: PropTypes.string.isRequired,
  title: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    patient: state.openmrs.selectedPatient ? state.openmrs.patients[state.openmrs.selectedPatient] : null,
  };
};

export default connect(mapStateToProps)(ScreeningForm);
