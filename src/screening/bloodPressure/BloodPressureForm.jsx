import React from "react";
import {Submit, Obs} from '@openmrs/react-components';
import {Grid, Row, FormGroup, ControlLabel, Col} from 'react-bootstrap';
import Form from '../../form/Form';
import { ENCOUNTER_TYPES, CONCEPTS } from "../../constants";

const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined ;

const maxValue = max => value =>
  value && value > max ? `Must be less than ${max + 1}` : undefined ;

const minValue40 = minValue(40);
const minValue50 = minValue(50);
const maxValue140 = maxValue(140);
const maxValue260 = maxValue(260);

let BloodPressureForm = props => {

  const formContent = (
    <Grid>
      <Row>
        <FormGroup controlId="formSystolic">
          <Col componentClass={ControlLabel} sm={2}>
            Systolic Blood Pressure
          </Col>
          <Col sm={4}>
            <Obs
              concept={CONCEPTS.SystolicBloodPressure.uuid}
              placeholder="Systolic value"
              path="Systolic"
              validate={[minValue50, maxValue260]}
            />
          </Col>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup controlId="formDiastolic">
          <Col componentClass={ControlLabel} sm={2}>
            Diastolic Blood Pressure
          </Col>
          <Col sm={4}>
            <Obs
              concept={CONCEPTS.DiastolicBloodPressure.uuid}
              placeholder="Diastolic value"
              validate={[minValue40, maxValue140]}
              path="Diastolic"
            />
          </Col>
        </FormGroup>
      </Row>
      <Row>
        <Submit/>
      </Row>
    </Grid>
  );

  return (
    <Form
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
