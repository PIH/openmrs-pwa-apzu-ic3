import React from 'react';
import { connect } from 'react-redux';
import {Obs} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import '../../assets/css/tabs.css';
import ScreeningForm from "../ScreeningForm";

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
    </Grid>
  );

  return (
    <ScreeningForm
      encounterType={ ENCOUNTER_TYPES.HTCEncounterType }
      formContent={formContent}
      formId="htc-form"
      title="HTC"
    />
  );
};

export default connect(state => {
  return {
    patient: state.openmrs.selectedPatient ? state.openmrs.patients[state.openmrs.selectedPatient] : null
  };
})(HtcForm);

