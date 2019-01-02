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
const minValue40 = formValidations.minValue(40);
const minValue50 = formValidations.minValue(50);
const maxValue140 = formValidations.maxValue(140);
const maxValue260 = formValidations.maxValue(260);

const abnormalMaxValue110 = formValidations.abnormalMaxValue(110);
const abnormalMaxValue160 = formValidations.abnormalMaxValue(160);

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
              validate={[minValue50, maxValue260]}
              warn={ abnormalMaxValue160 }
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
              validate={[minValue40, maxValue140]}
              path="diastolic"
              warn={ abnormalMaxValue110 }
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
