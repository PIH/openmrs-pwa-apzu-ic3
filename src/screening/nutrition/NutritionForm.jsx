import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Obs, formValidations } from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Label, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS } from "../../constants";
import utils from "../../utils";
import ScreeningForm from "../ScreeningForm";
import {leftTextAlign} from "../../pwaStyles";

const minValue25 = formValidations.minValue(25);
const maxValue140 = formValidations.maxValue(140);
const minValue2 = formValidations.minValue(2);
const maxValue100 = formValidations.maxValue(100);

class NutritionForm extends React.Component {

  render() {
    const formContent = (
      <Grid>
        <Row>
          <FormGroup controlId="formWeight">
            <Col componentClass={ControlLabel} sm={2}>
              Weight
            </Col>
            <Col sm={2}>
              <Obs
                concept={CONCEPTS.Weight.uuid}
                path="weight"
                placeholder="weight in kg"
                validate={ this.props.patient.age > 18 ? [minValue25, maxValue140] :  [minValue2, maxValue100] }
              />
            </Col>
            <Col componentClass={ControlLabel} sm={2} style={ leftTextAlign }>
              Kg
            </Col>
          </FormGroup>
        </Row>
        <Row>
          <FormGroup controlId="formHeight">
            <Col componentClass={ControlLabel} sm={2}>
              Height
            </Col>
            <Col sm={2}>
              <Obs
                concept={CONCEPTS.Height.uuid}
                path="height"
                placeholder="height in cm"
              />
            </Col>
            <Col componentClass={ControlLabel} sm={2} style={ leftTextAlign }>
              cm
            </Col>
          </FormGroup>
        </Row>
        { (this.props.patient.age >= 18) &&
        <Row>
          <FormGroup controlId="formBMI">
            <Col componentClass={ControlLabel} sm={2}>
              BMI
            </Col>
            { (typeof this.props.weight !== 'undefined') && (typeof this.props.height !== 'undefined') &&
            <Col sm={2}>
              <h3><Label bsStyle={this.props.bmiStyle}>{ this.props.bmi }</Label>
              </h3>
            </Col>
            }
          </FormGroup>
        </Row>
        }
        {(this.props.patient.age < 18) &&
        <Row>
          <FormGroup controlId="formMuac">
            <Col componentClass={ControlLabel} sm={2}>
              MUAC
            </Col>
            <Col sm={2}>
              <Obs
                concept={CONCEPTS.MUAC.uuid}
                path="muac"
                placeholder="muac in cm"
              />
            </Col>
            <Col componentClass={ControlLabel} sm={2} style={leftTextAlign}>
              cm
            </Col>
          </FormGroup>
        </Row>
        }
      </Grid>
    );

    return (
      <ScreeningForm
        encounterType={ENCOUNTER_TYPES.NutritionEncounterType}
        formId="nutrition-form"
        formInstanceId="nutrition-form"
        formContent={formContent}
        title="Nutrition"
      />
    );
  }

}

const selector = formValueSelector('nutrition-form');

export default connect(state => {
  const weight = selector(state, 'obs|path=weight|concept=' + CONCEPTS.Weight.uuid);
  const height = selector(state, 'obs|path=height|concept=' + CONCEPTS.Height.uuid);
  let bmi = null;
  let bmiStyle = "default;"
  if ( typeof weight !== 'undefined' && typeof height !== 'undefined') {
    bmi = utils.calculateBMI(weight, height);
    bmiStyle = utils.calculateBMIAlert(bmi);
  }

  return {
    weight,
    height,
    bmi,
    bmiStyle,
    patient: state.openmrs.selectedPatient ? state.openmrs.patients[state.openmrs.selectedPatient] : null,
  };
})(NutritionForm);

