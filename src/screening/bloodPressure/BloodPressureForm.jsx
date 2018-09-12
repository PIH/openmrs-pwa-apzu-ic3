import React from "react";
import {Submit, Obs, Section, EncounterFormPage} from '@openmrs/react-components';
import {Grid, Row, FormGroup, ControlLabel, Col} from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS } from "../../constants";
import { minValue, maxValue, abnormalMaxValue } from "../../validations";
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
const minValue40 = minValue(40);
const minValue50 = minValue(50);
const maxValue140 = maxValue(140);
const maxValue260 = maxValue(260);

const abnormalMaxValue110 = abnormalMaxValue(110);
const abnormalMaxValue160 = abnormalMaxValue(160);

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
          <Col sm={4}>
            <Obs
              concept={CONCEPTS.SystolicBloodPressure.uuid}
              placeholder="Systolic value"
              path="Systolic"
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
          <Col sm={4}>
            <Obs
              concept={CONCEPTS.DiastolicBloodPressure.uuid}
              placeholder="Diastolic value"
              validate={[minValue40, maxValue140]}
              path="Diastolic"
              warn={ abnormalMaxValue110 }
            />
          </Col>
          <Col componentClass={ControlLabel} sm={2} style={ leftTextAlign }>
            mmHG
          </Col>
        </FormGroup>
      </Row>
      <Row>
        <Col sm={4} xsOffset={7}>
          <Submit/>
        </Col>
      </Row>
    </Grid>
  );

  return (
    <EncounterFormPage
      afterSubmitLink="/screening/bloodPressure/queue"
      backLink="/screening/bloodPressure/queue"
      encounterType={ENCOUNTER_TYPES.BloodPressureEncounterType}
      formContent={formContent}
      title="Blood Pressure"
      formId="bp-form"
    />
  );
};

export default BloodPressureForm;
