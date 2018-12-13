/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import {Obs, formValidations, obsRest, formUtil, selectors} from '@openmrs/react-components';
import { Alert, Grid, Row, FormGroup, ControlLabel, Label, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, MALNUTRITION_LEVEL, FORM_ANSWERS } from "../../constants";
import utils from "../../utils";
import ScreeningForm from "../ScreeningForm";
import { centerElements, labelTop } from "../../pwaStyles";

const minValue2 = formValidations.minValue(2);
const minValue20 = formValidations.minValue(20);
const minValue25 = formValidations.minValue(25);
const minValue120 = formValidations.minValue(120);
const maxValue100 = formValidations.maxValue(100);
const maxValue140 = formValidations.maxValue(140);
const maxValue215 = formValidations.maxValue(215);

class NutritionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lastHeight: null
    };
  }

  componentDidMount() {
    // measure at each visit for less than 19 y.o., use previous height for >19 years
    if (this.props.patient.age > 19) {
      obsRest.fetchObsByPatient(
        this.props.patient.uuid, CONCEPTS.Height.uuid, 1
      ).then(data => {
        this.setState({
          lastHeight: data.results[0] ? data.results[0].value : null
        });
      });
    }
  }

  render() {
    const formContent = (
      <Grid>
        <br />
        <Row>
          <FormGroup controlId="formWeight">
            <ControlLabel xs={1} style={centerElements}>
              Weight
            </ControlLabel>

            <Col xs={4} xsOffset={4}>
              <Obs
                concept={CONCEPTS.Weight.uuid}
                path="weight"
                placeholder="weight in kg"
                validate={this.props.patient.age > 18 ? [minValue25, maxValue140] :  [minValue2, maxValue100]}
              />
            </Col>
            <ControlLabel xs={1} style={labelTop}>
              kg
            </ControlLabel>
          </FormGroup>

          <FormGroup controlId="formHeight">
            <ControlLabel xs={1} style={centerElements}>
              Height
            </ControlLabel>

            <Col xs={4} xsOffset={4}>
              <Obs
                concept={CONCEPTS.Height.uuid}
                path="height"
                placeholder="height in cm"
                value={ this.state.lastHeight !== null ? this.state.lastHeight : null }
                validate={this.props.patient.age > 18 ? [minValue120, maxValue215] :  [minValue20, maxValue215]}
              />
            </Col>
            <ControlLabel xs={1} style={labelTop}>
              cm
            </ControlLabel>
          </FormGroup>

        {( (this.props.patient.age >= 18) && (this.props.patient.age < 50) && (this.props.patient.gender === 'F') ) &&
          <FormGroup controlId="formPregnant">
            <ControlLabel sm={1} style={centerElements}>
            Pregnant
            </ControlLabel>
            <Col xs={6} xsOffset={3}>
              <Obs
                concept={CONCEPTS.Pregnant.uuid}
                conceptAnswers={FORM_ANSWERS.trueFalse}
                path="pregnant"
              />
            </Col>
          </FormGroup>
        }

        { (( this.props.patient.age >= 18 && this.props.patient.gender === 'M')
          || (this.props.patient.gender === 'F' && this.props.patient.age >= 18 && (this.props.pregnant !== null) && (this.props.pregnant === CONCEPTS.False.uuid))
          || (this.props.patient.gender === 'F' && this.props.patient.age > 50))&&
          <FormGroup controlId="formBMI">
            <ControlLabel xs={6} style={centerElements}>
            BMI
            </ControlLabel>
            <br />

            <Col xs={4} xsOffset={4}>
              <h3 style={ labelTop }><Label bsStyle={this.props.bmiStyle.alert} style={{visibility: "visible"}}>{ this.props.bmi ? this.props.bmi : "00.00" }</Label>
              </h3>
            </Col>

            <ControlLabel xs={1} style={labelTop}>
              kg/m<sup>2</sup>
            </ControlLabel>
          </FormGroup>
        }

        { ((this.props.patient.age < 18) || ( (this.props.patient.age >= 18) && (this.props.patient.gender === 'F') && (this.props.pregnant !== null) && (this.props.pregnant === CONCEPTS.True.uuid))) &&
            <FormGroup controlId="formMuac">
              <ControlLabel xs={2} style={centerElements}>
                MUAC
              </ControlLabel>
              <br />
              <Col sm={4} xsOffset={4}>
                <Obs
                  concept={CONCEPTS.MUAC.uuid}
                  path="muac"
                  placeholder="muac in cm"
                />
              </Col>
              <ControlLabel xs={1} style={labelTop}>
                cm
              </ControlLabel>
            </FormGroup>
          }
            <FormGroup controlId="formMalnutrition">
              <ControlLabel xs={2} style={centerElements}>
                <span style={{visibility: this.props.showMalnutrition}}>Malnutrition</span>
              </ControlLabel>
              <br />
              <Col xs={4} xsOffset={4}>
                <Alert
                  bsStyle={this.props.malnutrition ? this.props.malnutrition.alert : "info"}
                  style={{visibility: (this.props.malnutrition && this.props.malnutrition.message) ? "visible" : "hidden" }}
                >
                  {this.props.malnutrition ? this.props.malnutrition.message : " "}
                </Alert>
              </Col>

            </FormGroup>
        </Row>
      </Grid>
    );

    return (
      <ScreeningForm
        backLink="/screening/nutrition/queue"
        encounterType={ENCOUNTER_TYPES.NutritionEncounterType}
        formContent={formContent}
        formId="nutrition-form"
        formInstanceId="nutrition-form"
        defaultValues={ this.state.lastHeight !== null ? [{
          type: "obs",
          path: "height",
          concept: CONCEPTS.Height.uuid,
          value: this.state.lastHeight
        }] : null
        }
        toastMessage="Nutrition Saved"
      />
    );
  }

}

const selector = formValueSelector('nutrition-form');

export default connect(state => {
  const patient = selectors.getSelectedPatientFromStore(state);
  const weight = selector(state, formUtil.obsFieldName('weight', CONCEPTS.Weight.uuid));
  const height = selector(state, formUtil.obsFieldName('height', CONCEPTS.Height.uuid));
  const muac = selector(state, formUtil.obsFieldName('muac', CONCEPTS.MUAC.uuid));
  const pregnant = selector(state, formUtil.obsFieldName('pregnant', CONCEPTS.Pregnant.uuid));
  let bmi = null;
  let bmiStyle = MALNUTRITION_LEVEL.none;
  if ( typeof weight !== 'undefined' && typeof height !== 'undefined') {
    bmi = utils.calculateBMI(weight, height);
    bmiStyle = utils.calculateBMIAlert(bmi);
  }
  const malnutrition = utils.calculateMalnutritionLevel(bmi, muac, patient ? patient.age : null, pregnant);
  let showMalnutrition = "hidden";
  if (malnutrition &&
    (malnutrition === MALNUTRITION_LEVEL.moderate || malnutrition === MALNUTRITION_LEVEL.severe)) {
    showMalnutrition = "visible";
  }
  return {
    weight,
    height,
    pregnant,
    bmi,
    bmiStyle,
    malnutrition,
    showMalnutrition,
    patient,
  };
})(NutritionForm);

