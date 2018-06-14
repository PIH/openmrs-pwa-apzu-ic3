import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Grid, Row } from 'react-bootstrap';
import { OpenMRSForm, Submit, Obs } from '@openmrs/react-components';
import { ENCOUNTER_TYPES } from "../../constants";


// TODO extract out common elements
class BloodPressureForm extends React.Component {

  redirectToQueuePageActionCreator() {
    return push('/screening/bloodPressure/queue');
  }

  // TODO obviously we want to use mapping on forms, not uuid... maybe transpile??

  render() {
    return (
      <OpenMRSForm
        encounterType={ENCOUNTER_TYPES.BloodPressureEncounterType}
        formSubmittedActionCreator={this.redirectToQueuePageActionCreator}
        patient={this.props.patient}
        visit={this.props.visit}>
        <Grid>
          <Row>
            <Obs path="systolic" concept="3ce934fa-26fe-102b-80cb-0017a47871b2" />
            /
            <Obs path="diastolic" concept="3ce93694-26fe-102b-80cb-0017a47871b2" />
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

export default connect(mapStateToProps)(BloodPressureForm);
