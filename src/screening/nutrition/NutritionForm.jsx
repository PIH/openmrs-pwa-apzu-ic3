import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Obs, formValidations } from '@openmrs/react-components';
import { Alert, Grid, Row, FormGroup, ControlLabel, Label, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, MALNUTRITION_LEVEL, FORM_ANSWERS } from "../../constants";
import utils from "../../utils";
import ScreeningForm from "../ScreeningForm";
import { colHeight, leftTextAlign } from "../../pwaStyles";

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
            <Col
              componentClass={ControlLabel}
              sm={2}
            >
              Weight
            </Col>
            <Col sm={2}>
              <Obs
                concept={CONCEPTS.Weight.uuid}
                path="weight"
                placeholder="weight in kg"
                validate={this.props.patient.age > 18 ? [minValue25, maxValue140] :  [minValue2, maxValue100]}
              />
            </Col>
            <Col
              componentClass={ControlLabel}
              sm={2}
              style={leftTextAlign}
            >
              Kg
            </Col>
          </FormGroup>
        </Row>
        <Row>
          <FormGroup controlId="formHeight">
            <Col
              componentClass={ControlLabel}
              sm={2}
            >
              Height
            </Col>
            <Col sm={2}>
              <Obs
                concept={CONCEPTS.Height.uuid}
                path="height"
                placeholder="height in cm"
              />
            </Col>
            <Col
              componentClass={ControlLabel}
              sm={2}
              style={leftTextAlign}
            >
              cm
            </Col>
          </FormGroup>
        </Row>

        {( (this.props.patient.age >= 18) && (this.props.patient.age < 50) && (this.props.patient.gender === 'F') ) &&
        <Row>
          <FormGroup controlId="formPregnant">
            <Col
              componentClass={ControlLabel}
              sm={2}
            >
            Pregnant
            </Col>
            <Col sm={4}>
              <Obs
                concept={CONCEPTS.Pregnant.uuid}
                conceptAnswers={FORM_ANSWERS.trueFalse}
                path="pregnant"
              />
            </Col>
          </FormGroup>
        </Row>
        }

        { (( this.props.patient.age >= 18 && this.props.patient.gender === 'M')
          || (this.props.patient.gender === 'F' && this.props.patient.age >= 18 && (this.props.pregnant !== null) && (this.props.pregnant === CONCEPTS.False.uuid))
          || (this.props.patient.gender === 'F' && this.props.patient.age > 50))&&
          <Row>
            <FormGroup controlId="formBMI">
              <Col
                componentClass={ControlLabel}
                sm={2}
              >
              BMI
              </Col>
              { (typeof this.props.weight !== 'undefined') && (typeof this.props.height !== 'undefined') &&
              <Col sm={2}>
                <h3><Label bsStyle={this.props.bmiStyle.alert}>{ this.props.bmi }</Label>
                </h3>
              </Col>
              }
            </FormGroup>
          </Row>
        }

        { ((this.props.patient.age < 18) || ( (this.props.patient.age >= 18) && (this.props.patient.gender === 'F') && (this.props.pregnant !== null) && (this.props.pregnant === CONCEPTS.True.uuid))) &&
        <Row>
          <FormGroup controlId="formMuac">
            <Col
              componentClass={ControlLabel}
              sm={2}
            >
              MUAC
            </Col>
            <Col sm={2}>
              <Obs
                concept={CONCEPTS.MUAC.uuid}
                path="muac"
                placeholder="muac in cm"
              />
            </Col>
            <Col
              componentClass={ControlLabel}
              sm={2}
              style={leftTextAlign}
            >
              cm
            </Col>
          </FormGroup>
        </Row>
        }
        {(this.props.malnutrition !== null)
        && ((this.props.malnutrition === MALNUTRITION_LEVEL.severe) || (this.props.malnutrition === MALNUTRITION_LEVEL.moderate)) &&
        <Row>
          <FormGroup controlId="formMalnutrition">
            <Col
              componentClass={ControlLabel}
              sm={2}
            >
              Malnutrition
            </Col>
            <Col sm={2}>
              <Alert bsStyle={this.props.malnutrition.alert}>
                { this.props.malnutrition.message }
              </Alert>
            </Col>

          </FormGroup>
        </Row>
        }
        <Row>
          <Col
            md={20}
            sm={20}
            style={colHeight}
          >
            <span><h1>{ '' }</h1></span>
          </Col>
        </Row>
      </Grid>
    );

    return (
      <ScreeningForm
        encounterType={ENCOUNTER_TYPES.NutritionEncounterType}
        formContent={formContent}
        formId="nutrition-form"
        formInstanceId="nutrition-form"
        title="Nutrition"
      />
    );
  }

}

const selector = formValueSelector('nutrition-form');

export default connect(state => {
  const patient = state.openmrs.selectedPatient ? state.openmrs.patients[state.openmrs.selectedPatient] : null;
  const weight = selector(state, 'obs|path=weight|concept=' + CONCEPTS.Weight.uuid);
  const height = selector(state, 'obs|path=height|concept=' + CONCEPTS.Height.uuid);
  const muac = selector(state, 'obs|path=muac|concept=' + CONCEPTS.MUAC.uuid);
  const pregnant = selector(state, 'obs|path=pregnant|concept=' + CONCEPTS.Pregnant.uuid);
  let bmi = null;
  let bmiStyle = MALNUTRITION_LEVEL.none;
  if ( typeof weight !== 'undefined' && typeof height !== 'undefined') {
    bmi = utils.calculateBMI(weight, height);
    bmiStyle = utils.calculateBMIAlert(bmi);
  }
  const malnutrition = utils.calculateMalnutritionLevel(bmi, muac, patient ? patient.age : null, pregnant);
  return {
    weight,
    height,
    pregnant,
    bmi,
    bmiStyle,
    malnutrition,
    patient,
  };
})(NutritionForm);

