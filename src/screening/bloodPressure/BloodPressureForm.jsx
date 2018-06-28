import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Grid, Row, Label } from 'react-bootstrap';
import { OpenMRSForm, Submit, Obs } from '@openmrs/react-components';
import PropTypes from 'prop-types';
import Form from '../../form/Form';
import { ENCOUNTER_TYPES } from "../../constants";

class BloodPressureForm extends Form {

  formSubmittedActionCreator() {
    return push('/screening/bloodPressure/queue');
  }

  // TODO obviously we want to use mapping on forms, not uuid... maybe transpile??

  render() {
    return (
      <div>
        <h3><Label>Blood Pressure</Label></h3>
        <OpenMRSForm
          encounterType={ENCOUNTER_TYPES.BloodPressureEncounterType}
          formSubmittedActionCreator={this.formSubmittedActionCreator}
          patient={this.props.patient}
          visit={this.props.visit}
        >
          <Grid>
            <Row>
              <Obs
                concept="3ce934fa-26fe-102b-80cb-0017a47871b2"
                path="systolic"
              />
              /
              <Obs
                concept="3ce93694-26fe-102b-80cb-0017a47871b2"
                path="diastolic"
              />
            </Row>
            <Row>
              <Submit />
            </Row>
          </Grid>
        </OpenMRSForm>
      </div>
    );
  }

}

BloodPressureForm.propTypes = {
  patient: PropTypes.object.isRequired,
  visit: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    patient: state.selected.patient,
    visit: {
      uuid: state.selected.patient.activeVisit
    }
  };
};

export default connect(mapStateToProps)(BloodPressureForm);
