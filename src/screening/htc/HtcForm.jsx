import React from 'react';
import { connect } from 'react-redux';
import {Obs, selectors} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import {ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS} from "../../constants";
import '../../assets/css/tabs.css';
import ScreeningForm from "../ScreeningForm";

let HtcForm = (props) => {

  const formContent = (
    <Grid>
      <Row>
        <Col componentClass={ControlLabel}>
          Results
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <FormGroup controlId="formHtc">
            <Obs
              concept={CONCEPTS.HTC_RESULTS.uuid}
              conceptAnswers={FORM_ANSWERS.htcAnswers}
              path="htc-results"/>
          </FormGroup>
        </Col>
      </Row>
    </Grid>
  );

  return (
    <ScreeningForm
      backLink={props.backLink ? props.backLink : "/screening/htc/queue"}
      encounterType={ENCOUNTER_TYPES.HTCEncounterType}
      formContent={formContent}
      formId="htc-form"
      toastMessage="HTC Saved"
    />
  );
};

export default connect(state => {
  return {
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(HtcForm);

