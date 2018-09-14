import React from "react";
import {Obs, Section, EncounterFormPage, formValidations } from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS } from "../../constants";
import {colHeight, leftTextAlign} from "../../pwaStyles";

/**
 * Range of possible values
 * SBP 50-260
 * DBP 40-140
 *
 * Abnormal results
 * SBP > 160
 * DBP > 110
 */
const minValue40 = formValidations.minValue(40);
const minValue50 = formValidations.minValue(50);
const maxValue140 = formValidations.maxValue(140);
const maxValue260 = formValidations.maxValue(260);

const abnormalMaxValue110 = formValidations.abnormalMaxValue(110);
const abnormalMaxValue160 = formValidations.abnormalMaxValue(160);

const backLink = "/screening/bloodPressure/queue";

let BloodPressureForm = props => {

  const formContent = (
    <Grid>
      <Section title="Enter Patient Blood Pressure"></Section>
      <Row>
        <Col sm={20} md={20} style={ colHeight }>
          <span><h1>{ '' }</h1></span>
        </Col>
      </Row>
      <Row>
        <FormGroup controlId="formSystolic">
          <Col componentClass={ControlLabel} sm={4}>
            Systolic Blood Pressure
          </Col>
          <Col sm={2}>
            <Obs
              concept={CONCEPTS.SystolicBloodPressure.uuid}
              placeholder="Systolic value"
              path="systolic"
              validate={[minValue50, maxValue260]}
              warn={ abnormalMaxValue160 }
            />
          </Col>
          <Col componentClass={ControlLabel} sm={2} style={ leftTextAlign }>
            mmHG
          </Col>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup controlId="formDiastolic">
          <Col componentClass={ControlLabel} sm={4}>
            Diastolic Blood Pressure
          </Col>
          <Col sm={2}>
            <Obs
              concept={CONCEPTS.DiastolicBloodPressure.uuid}
              placeholder="Diastolic value"
              validate={[minValue40, maxValue140]}
              path="diastolic"
              warn={ abnormalMaxValue110 }
            />
          </Col>
          <Col componentClass={ControlLabel} sm={2} style={ leftTextAlign }>
            mmHG
          </Col>
        </FormGroup>
      </Row>

    </Grid>
  );

  return (
    <EncounterFormPage
      afterSubmitLink="/screening/bloodPressure/queue"
      backLink={ backLink }
      encounterType={ENCOUNTER_TYPES.BloodPressureEncounterType}
      formContent={formContent}
      title="Blood Pressure"
      formId="bp-form"
    />
  );
};

export default BloodPressureForm;
