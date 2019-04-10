import React from "react";
import { Obs } from '@openmrs/react-components';
import { Grid, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS } from "../../constants";
import { noPaddingLeftAndRight, flexBaseline } from "../../pwaStyles";
import ScreeningForm from "../ScreeningForm";

let BloodPressureForm = props => {

  const formContent = (
    <Grid>
      <Col sm={12}>
        <div>
          <ControlLabel sm={6}>
            Systolic Blood Pressure
          </ControlLabel>
        </div>
        <FormGroup controlId="formSystolic" style={flexBaseline}>
          <Col sm={2}>
            <Obs
              concept={CONCEPTS.SystolicBloodPressure}
              placeholder="value"
              path="systolic"
              required
            />
          </Col>
          <ControlLabel sm={1} style={noPaddingLeftAndRight}>
            mmHG
          </ControlLabel>
        </FormGroup>
      </Col>
      <Col sm={12}>
        <div>
          <ControlLabel sm={6}>
            Diastolic Blood Pressure
          </ControlLabel>
        </div>
        <FormGroup controlId="formDiastolic" style={flexBaseline}>
          <Col sm={2}>
            <Obs
              concept={CONCEPTS.DiastolicBloodPressure}
              placeholder="value"
              path="diastolic"
              required
            />
          </Col>
          <ControlLabel sm={1} style={noPaddingLeftAndRight}>
            mmHG
          </ControlLabel>
        </FormGroup>
      </Col>
    </Grid>
  );

  return (
    <ScreeningForm
      backLink={props.backLink}
      encounterType={ENCOUNTER_TYPES.BloodPressureEncounterType}
      formContent={formContent}
      toastMessage="Blood Pressure Saved"
      formId="bp-form"
      formInstanceId={props.formInstanceId}
    />
  );
};

export default BloodPressureForm;
