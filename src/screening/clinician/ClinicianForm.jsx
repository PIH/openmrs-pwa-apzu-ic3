import React from 'react';
import { connect } from 'react-redux';
import { Obs, selectors } from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS } from '../../constants';
import ScreeningForm from "../ScreeningForm";

const ClinicianForm = (props) => {
  const formContent = (
    <Grid>
      <Row>
        <Col
          componentClass={ControlLabel}
        >
          Clinical Notes
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <FormGroup controlId="formClinicalNotes">
            <Obs
              concept={CONCEPTS.ClinicalNotes.uuid}
              path="clinical-notes"
              widget="textarea"
            />
          </FormGroup>
        </Col>
      </Row>
    </Grid>
  );

  return (
    <ScreeningForm
      backLink="/screening/clinician/queue"
      encounterType={ENCOUNTER_TYPES.ClinicalPlan}
      formContent={formContent}
      formId="vl-form"
      formInstanceId={props.formInstanceId}
      toastMessage="Clinical Notes Saved"
    />
  );
}


export default connect((state, props) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
  };
})(ClinicianForm);

