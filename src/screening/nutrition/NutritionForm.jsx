import React from 'react';
import { connect } from 'react-redux';
import { OpenMRSForm, Submit, Obs } from '@openmrs/react-components';
import { Grid, Row, Label, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import Form from '../../form/Form';
import { ENCOUNTER_TYPES, CONCEPTS } from "../../constants";

class NutritionForm extends Form {

  queueLink() {
    return "/screening/nutrition/queue";
  }

  formContent() {
    return (
      <div>
        <h3><Label>Nutrition</Label></h3>
        <OpenMRSForm
          encounterType={ENCOUNTER_TYPES.NutritionEncounterType}
          formSubmittedActionCreator={this.formSubmittedActionCreators}
          patient={this.props.patient}
          visit={this.props.visit}>
          <Grid>
            <Row>
              <FormGroup controlId="formWeight">
                <Col componentClass={ControlLabel} sm={2}>
                  Weight
                </Col>
                <Col sm={4}>
                  <Obs
                    concept={CONCEPTS.Weight.uuid}
                    path="Weight"
                  />
                </Col>
              </FormGroup>
            </Row>
            <Row>
              <FormGroup controlId="formHeight">
                <Col componentClass={ControlLabel} sm={2}>
                  Height
                </Col>
                <Col sm={4}>
                  <Obs
                    concept={CONCEPTS.Height.uuid}
                    path="Height"
                  />
                </Col>
              </FormGroup>
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

const mapStateToProps = (state) => {
  return {
    patient: state.selectedPatient,
    visit: state.selectedPatient.visit
  };
};

export default connect(mapStateToProps)(NutritionForm);
