import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import {Submit, Obs, EncounterFormPage} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";

let DnaPcrForm = (props) => {

  const formContent = (
    <Grid>

      <Row>
        <FormGroup controlId="formBled">
          <Col componentClass={ControlLabel} sm={2}>
            Bled
          </Col>
          <Col sm={8}>
            <Obs
              concept={CONCEPTS.VIRAL_LOAD_TEST_SET.Bled.uuid}
              path="dna-pcr-bled"
              conceptAnswers={ FORM_ANSWERS.bledAnswers }
            />
          </Col>
        </FormGroup>
      </Row>

      {(typeof props.bled !== 'undefined') &&
      (props.bled === CONCEPTS.VIRAL_LOAD_TEST_SET.False.uuid) &&
      <Row>
        <FormGroup controlId="formReasonForNoSample">
          <Col componentClass={ControlLabel} sm={2}>
            Reason for no sample
          </Col>
          <Col sm={10}>
            <Obs
              concept={CONCEPTS.VIRAL_LOAD_TEST_SET.ReasonForNoSample.uuid}
              path="dna-pcrdr-reason-no-sample"
              conceptAnswers={ FORM_ANSWERS.noSampleAnswers }
            />
          </Col>
        </FormGroup>
      </Row>
      }

      {(typeof props.bled !== 'undefined') &&
      (props.bled === CONCEPTS.VIRAL_LOAD_TEST_SET.True.uuid) &&
      <Row>
        <FormGroup controlId="formReasonForTesting">
          <Col componentClass={ControlLabel} sm={2}>
            Reason for testing
          </Col>
          <Col sm={8}>
            <Obs
              concept={CONCEPTS.VIRAL_LOAD_TEST_SET.ReasonForTesting.uuid}
              path="dna-pcr-reason-for-testing"
              conceptAnswers={ FORM_ANSWERS.dnaPcrReasonForTesting }
            />
          </Col>
        </FormGroup>
      </Row>
      }

      {(typeof props.bled !== 'undefined') &&
      (props.bled === CONCEPTS.VIRAL_LOAD_TEST_SET.True.uuid) &&
      <Row>
        <FormGroup controlId="formLabLocation">
          <Col componentClass={ControlLabel} sm={2}>
            Laboratory
          </Col>
          <Col sm={8}>
            <Obs
              concept={CONCEPTS.VIRAL_LOAD_TEST_SET.LabLocation.uuid}
              path="dna-pcr-lab-location"
              conceptAnswers={ FORM_ANSWERS.labLocation }
            />
          </Col>
        </FormGroup>
      </Row>
      }
      <Row>
        <Col sm={2}></Col>
        <Col sm={4}><Submit /></Col>
      </Row>
    </Grid>
  );

  return (
    <EncounterFormPage
      afterSubmitLink="/screening/eid/queue"
      backLink="/screening/eid/queue"
      encounterType={ ENCOUNTER_TYPES.DnaPcrEncounterType }
      formContent={formContent}
      formId="dna-pcr-form"
      title=""
    />
  );
};

const selector = formValueSelector('dna-pcr-form');

export default connect(state => {
  const bled = selector(state, 'obs|path=dna-pcr-bled|concept=' + CONCEPTS.VIRAL_LOAD_TEST_SET.Bled.uuid);
  return {
    bled,
    patient: state.selectedPatient ? state.patients[state.selectedPatient] : null,
  };
})(DnaPcrForm);

