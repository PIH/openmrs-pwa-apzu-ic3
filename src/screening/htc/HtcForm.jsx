import React from 'react';
import { connect } from 'react-redux';
import {Submit, Obs, EncounterFormPage} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import '../../assets/css/tabs.css';

let HtcForm = (props) => {

  const formContent = (
    <Grid>

      <Row>
        <FormGroup controlId="formHtc">
          <Col componentClass={ControlLabel} sm={2}>
            Results
          </Col>
          <Col sm={8}>
            <Obs
              concept={CONCEPTS.HTC_RESULTS.uuid}
              path="htc-results"
              conceptAnswers={ FORM_ANSWERS.htcAnswers }
            />
          </Col>
        </FormGroup>
      </Row>

      <Row>
        <Submit />
      </Row>
    </Grid>
  );

  return (
    <EncounterFormPage
      afterSubmitLink={ props.afterSubmitLink ? props.afterSubmitLink : "/screening/htc/queue" }
      backLink={ props.backLink ? props.backLink : "/screening/htc/queue" }
      encounterType={ ENCOUNTER_TYPES.HTCEncounterType }
      formContent={formContent}
      formId="htc-form"
      title="HTC"
    />
  );
};

export default connect(state => {
  return {
    patient: state.selectedPatient ? state.patients[state.selectedPatient] : null
  };
})(HtcForm);

