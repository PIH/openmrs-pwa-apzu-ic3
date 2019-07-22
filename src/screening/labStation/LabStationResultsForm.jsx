import React from "react";
import { Obs } from '@openmrs/react-components';
import { Grid, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS } from "../../constants";
import { noPaddingLeftAndRight, flexBaseline } from "../../pwaStyles";
import ScreeningForm from "../ScreeningForm";

let LabStationResultsForm = props => {

  const formContent = (
    <Grid>
      <Col sm={12}>
        <div>
          <ControlLabel sm={6}>
            HbA1c
          </ControlLabel>
        </div>
        <FormGroup controlId="formHbA1c" style={flexBaseline}>
          <Col sm={2}>
            <Obs
              concept={ CONCEPTS.HbA1c }
              placeholder="value"
              path="hbA1c"
            />
          </Col>
          <ControlLabel sm={1} style={noPaddingLeftAndRight}>
            %
          </ControlLabel>
        </FormGroup>
      </Col>
      <Col sm={12}>
        <div>
          <ControlLabel sm={6}>
            Creatinine
          </ControlLabel>
        </div>
        <FormGroup controlId="formCreatinine" style={flexBaseline}>
          <Col sm={2}>
            <Obs
              concept={CONCEPTS.CREATININE}
              placeholder="value"
              path="creatinine"
            />
          </Col>
          <ControlLabel sm={1} style={noPaddingLeftAndRight}>
            mg/dl
          </ControlLabel>
        </FormGroup>
      </Col>


    </Grid>
  );

  return (
    <ScreeningForm
      backLink={props.backLink}
      encounterType={ENCOUNTER_TYPES.LabStationResultsEncounterType}
      formContent={formContent}
      toastMessage="Lab Results Saved"
      formId="lab-results-form"
      formInstanceId={props.formInstanceId}
    />
  );
};

export default LabStationResultsForm;
