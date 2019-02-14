/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { format, startOfDay } from 'date-fns';
import {Obs, formValidations, obsRest, formUtil, selectors} from '@openmrs/react-components';
import { Alert, Grid, Row, FormGroup, ControlLabel, Label, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, MALNUTRITION_LEVEL, FORM_ANSWERS } from "../../constants";
import utils from "../../utils";
import ScreeningForm from "../ScreeningForm";
import { labelTop, flexBaseline } from "../../pwaStyles";

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
      lastHeight: null,
      lastResultDate: null,
    };
  }

  componentDidMount() {
    // measure at each visit for less than 19 y.o., use previous height for >19 years
    if (this.props.patient.age > 19) {
      obsRest.fetchObsByPatient(
        this.props.patient.uuid, CONCEPTS.Height.uuid, [], [], 1
      ).then(data => {
        this.setState({
          lastHeight: data.results[0] ? data.results[0].value : null,
          lastResultDate: data.results[0] ? (data.results[0].encounter.encounterDatetime || data.results[0].obsDatetime) : null
        });
      });
    }
  }

  render() {
    let bmi = null;
    let bmiStyle = MALNUTRITION_LEVEL.none;

    if (this.props.weight && !this.props.height) {
      bmi = utils.calculateBMI(this.props.weight, this.state.lastHeight);
      bmiStyle = utils.calculateBMIAlert(bmi);
    } else if (this.props.weight && this.props.height) {
      bmi = utils.calculateBMI(this.props.weight, this.props.height);
      bmiStyle = utils.calculateBMIAlert(bmi);
    }

    const formContent = (
      <Grid>
        <br />
        <Row>
          <Col sm={12}>
            <div>
              <ControlLabel sm={6}>
                Weight
              </ControlLabel>
            </div>
            <FormGroup controlId="formWeight" style={flexBaseline}>
              <Col sm={4}>
                <Obs
                  concept={CONCEPTS.Weight.uuid}
                  path="weight"
                  placeholder="weight in kg"
                  validate={this.props.patient.age > 18 ? [minValue25, maxValue140] :  [minValue2, maxValue100]}
                />
              </Col>
              <ControlLabel sm={1}>
                kg
              </ControlLabel>
            </FormGroup>
          </Col>

          <Col sm={12}>
            <div>
              {(this.state.lastHeight !== null) &&
                (<p>
                  <span>
                    <em>
                      <b>Previous height taken as {this.state.lastHeight}cm on {format(startOfDay(this.state.lastResultDate), 'DD MMM YYYY')}</b>
                    </em>
                  </span>
                </p>
                )
              }
              <ControlLabel sm={6}>
                Height
              </ControlLabel>
            </div>
            <FormGroup controlId="formHeight" style={flexBaseline}>
              <Col sm={4}>
                <Obs
                  concept={CONCEPTS.Height.uuid}
                  path="height"
                  placeholder="height in cm"
                  validate={this.props.patient.age > 18 ? [minValue120, maxValue215] :  [minValue20, maxValue215]}
                />
              </Col>
              <ControlLabel sm={1}>
                cm
              </ControlLabel>
            </FormGroup>
          </Col>

        {( (this.props.patient.age >= 18) && (this.props.patient.age < 50) && (this.props.patient.gender === 'F') ) &&
          <Col sm={12}>
            <div>
              <ControlLabel sm={6}>
                Pregnant
              </ControlLabel>
            </div>
            <FormGroup controlId="formPregnant">
              <Col xs={5}>
                <Obs
                  concept={CONCEPTS.Pregnant.uuid}
                  conceptAnswers={FORM_ANSWERS.yesNo}
                  path="pregnant"
                />
              </Col>
            </FormGroup>
          </Col>
        }

        { (( this.props.patient.age >= 18 && this.props.patient.gender === 'M')
          || (this.props.patient.gender === 'F' && this.props.patient.age >= 18 && (this.props.pregnant !== null) && (this.props.pregnant === CONCEPTS.No.uuid))
          || (this.props.patient.gender === 'F' && this.props.patient.age > 50))&&
        bmi &&
            <Col sm={12}>
              <div>
              <ControlLabel xs={6}>
              BMI
              </ControlLabel>
              </div>
            <FormGroup controlId="formBMI" style={flexBaseline}>
              <br />
              <Col sm={4}>
                <h3 style={labelTop}><Label bsStyle={bmiStyle.alert} style={{ visibility: "visible" }}>{bmi}</Label>
                </h3>
              </Col>

              <ControlLabel sm={1}>
                kg/m<sup>2</sup>
              </ControlLabel>

              {bmiStyle.display &&
                <Col sm={4}>
                  <span style={labelTop}><span className={bmiStyle.displayClassName} style={{ visibility: "visible" }}>({bmiStyle.display})</span>
                  </span>
                </Col>
              }
            </FormGroup>
          </Col>
        }

          {((this.props.patient.age < 18) || ((this.props.patient.age >= 18) && (this.props.patient.gender === 'F') && (this.props.pregnant !== null) && (this.props.pregnant === CONCEPTS.Yes.uuid))) &&
          <Col sm={12}>
            <div>
                <ControlLabel xs={6}>
                  MUAC
                </ControlLabel>
            </div>
            <FormGroup controlId="formMuac"  style={flexBaseline}>
              <br />
              <Col sm={4}>
                <Obs
                  concept={CONCEPTS.MUAC.uuid}
                  path="muac"
                  placeholder="muac in cm"
                />
              </Col>
              <ControlLabel sm={1}>
                cm
              </ControlLabel>
            </FormGroup>
          </Col>
          }
        </Row>
      </Grid>
    );

    return (
      <ScreeningForm
        backLink="/screening/nutrition/queue"
        encounterType={ENCOUNTER_TYPES.NutritionEncounterType}
        formContent={formContent}
        formId="nutrition-form"
        formInstanceId={this.props.formInstanceId}
        defaultValues={ this.state.lastHeight !== null ? [{
          type: "obs",
          path: "height",
          concept: CONCEPTS.Height.uuid,
        }] : null
        }
        toastMessage="Nutrition Saved"
      />
    );
  }

}


export default connect((state, props) => {
  const patient = selectors.getSelectedPatientFromStore(state);
  const selector = formValueSelector(props.formInstanceId);
  const weight = selector(state, formUtil.obsFieldName('weight', CONCEPTS.Weight.uuid));
  const height = selector(state, formUtil.obsFieldName('height', CONCEPTS.Height.uuid));
  const muac = selector(state, formUtil.obsFieldName('muac', CONCEPTS.MUAC.uuid));
  const pregnant = selector(state, formUtil.obsFieldName('pregnant', CONCEPTS.Pregnant.uuid));

  return {
    weight,
    height,
    pregnant,
    patient,
  };
})(NutritionForm);

