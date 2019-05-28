import React from "react";
import {EncounterFormPanel, visitActions, selectors} from '@openmrs/react-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import patientActions from '../patient/patientActions';
import { ACTIVE_VISITS_REP, ENCOUNTER_ROLES } from "../constants";


class ScreeningForm extends React.Component {

  render() {

    const props = this.props;

    // we want to update the active visit and the IC3 screening report for the current patient after submit
    const formSubmittedActionCreators = [
      () => props.patient && props.patient.uuid && visitActions.fetchPatientActiveVisit(props.patient.uuid,
        this.props.sessionLocation ? this.props.sessionLocation.uuid : null, ACTIVE_VISITS_REP),
      () => props.patient && props.patient.uuid && patientActions.getIC3PatientScreeningData(props.patient),
      () => props.patient && props.patient.uuid && patientActions.getIC3PatientNutritionHistory(props.patient),
    ];

    return (
      <div>
        <EncounterFormPanel
          backLink={props.backLink}
          defaultValues={props.defaultValues}
          encounterRole={ENCOUNTER_ROLES.UnknownEncounterRole}
          encounterType={props.encounterType}
          formContent={props.formContent}
          formId={props.formId}
          formInstanceId={props.formInstanceId}
          formSubmittedActionCreators={formSubmittedActionCreators}
          // hideActionButtons={true}
          hideSubmitActionButtons={props.hideSubmitActionButtons}
          showDate={true}
          title={props.title}
          toastMessage={props.toastMessage ? props.toastMessage : "Screening Form Saved"}
          visitType={props.visitType}
        />
      </div>
    );
  }
};

ScreeningForm.propTypes = {
  backLink: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  encounterType: PropTypes.object.isRequired,
  formContent: PropTypes.object.isRequired,
  formId: PropTypes.string.isRequired,
  sessionLocation: PropTypes.object,
  toastMessage: PropTypes.string,
  title: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
    sessionLocation: state.openmrs.session.sessionLocation
  };
};

export default connect(mapStateToProps)(ScreeningForm);
