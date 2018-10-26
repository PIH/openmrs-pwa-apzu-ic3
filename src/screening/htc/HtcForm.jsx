import React from 'react';
import { connect } from 'react-redux';
import {Obs, selectors} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS, HIV_TEST_TYPES } from "../../constants";
import '../../assets/css/tabs.css';
import ScreeningForm from "../ScreeningForm";
import PatientLabTests from "../../patient/PatientLabTests";

let HtcForm = (props) => {

  const formContent = (
    <Grid>
      <Row>
        <Col sm={8}>
          <FormGroup controlId="formHtc">
            <Col
              componentClass={ControlLabel}
              sm={2}
            >
            Results
            </Col>
            <Col sm={8}>
              <Obs
                concept={CONCEPTS.HTC_RESULTS.uuid}
                conceptAnswers={FORM_ANSWERS.htcAnswers}
                path="htc-results"
              />
            </Col>
          </FormGroup>
        </Col>
        <Col sm={4}>
          <PatientLabTests test_type={HIV_TEST_TYPES.hiv_test + "; " + HIV_TEST_TYPES.rapid_test} />
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
      title="HTC"
    />
  );
};

export default connect(state => {
  return {
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(HtcForm);

