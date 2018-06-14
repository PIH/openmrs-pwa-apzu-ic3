import React from 'react';
import { connect } from 'react-redux';
import { OpenMRSForm, Submit } from '@openmrs/react-components';
import { ENCOUNTER_TYPES } from "../../constants";

// TODO extract out common elements
class BloodPressureForm extends React.Component {

  render() {
    return (
      <OpenMRSForm
        encounterType={ENCOUNTER_TYPES.BloodPressureEncounterType}
        patient={this.props.patient}
        visit={this.props.visit}>
        <p>My Blood Pressure Form</p>
        <Submit />
      </OpenMRSForm>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    patient: state.selected.patient.patient,  // TODO update this when we fix the organization of the patient object
    visit: {  // TODO update this when we fix the organization of the patient object
      uuid: state.selected.patient.uuid
    }
  };
};

export default connect(mapStateToProps)(BloodPressureForm);
