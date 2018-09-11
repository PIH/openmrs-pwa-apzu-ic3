import React from "react";
import {Submit, Obs} from '@openmrs/react-components';
import {Grid, Row, FormGroup, ControlLabel, Col} from 'react-bootstrap';
import Form from '../../form/Form';
import { ENCOUNTER_TYPES, CONCEPTS } from "../../constants";

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
              label="Systolic"
              min = { 50 }
              max = { 260 }
              path="Systolic"
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
              min = { 40 }
              max = { 140 }
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
