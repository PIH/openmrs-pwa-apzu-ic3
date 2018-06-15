import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { OpenMRSForm, Submit } from '@openmrs/react-components';
import { Grid, Row } from 'react-bootstrap';
import Form from '../../form/Form';
import { ENCOUNTER_TYPES } from "../../constants";

class NutritionForm extends Form {

  formSubmittedActionCreator() {
    return push('/screening/nutrition/queue');
  }

  // TODO correct encounter type

  render() {
    return (
      <OpenMRSForm
        encounterType={ENCOUNTER_TYPES.BloodPressureEncounterType}
        formSubmittedActionCreator={this.formSubmittedActionCreator}
        patient={this.props.patient}
        visit={this.props.visit}>
        <Grid>
          <Row>
           Add Nutrituion Form
          </Row>
          <Row>
            <Submit />
          </Row>
        </Grid>
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

export default connect(mapStateToProps)(NutritionForm);
