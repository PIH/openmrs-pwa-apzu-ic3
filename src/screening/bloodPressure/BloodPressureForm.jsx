import React from "react";
import {Obs, formValidations} from '@openmrs/react-components';
import { Grid, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS } from "../../constants";
import { noPaddingLeftAndRight, flexBaseline } from "../../pwaStyles";
import ScreeningForm from "../ScreeningForm";

/**
 * Range of possible values
 * SBP 50-260
 * DBP 40-140
 *
 * Abnormal results
 * SBP > 160
 * DBP > 110
 */
const systolicBloodPressureNormalRange = formValidations.getNormalRangeFromConcept(CONCEPTS.SystolicBloodPressure);
const systolicBloodPressureAbNormalRange = formValidations.getAbNormalRangeFromConcept(CONCEPTS.SystolicBloodPressure);
const DiastolicBloodPressureNormalRange = formValidations.getNormalRangeFromConcept(CONCEPTS.DiastolicBloodPressure);
const DiastolicBloodPressureAbNormalRange = formValidations.getAbNormalRangeFromConcept(CONCEPTS.DiastolicBloodPressure);

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
              concept={CONCEPTS.SystolicBloodPressure.uuid}
              placeholder="value"
              path="systolic"
              validate={props.validate || systolicBloodPressureNormalRange}
              warn={props.warn || systolicBloodPressureAbNormalRange}
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
              concept={CONCEPTS.DiastolicBloodPressure.uuid}
              placeholder="value"
              path="diastolic"
              validate={props.validate || DiastolicBloodPressureNormalRange}
              warn={props.warn || DiastolicBloodPressureAbNormalRange}
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
      backLink="/screening/bloodPressure/queue"
      encounterType={ENCOUNTER_TYPES.BloodPressureEncounterType}
      formContent={formContent}
      toastMessage="Blood Pressure Saved"
      formId="bp-form"
      formInstanceId={props.formInstanceId}
    />
  );
};

export default BloodPressureForm;
