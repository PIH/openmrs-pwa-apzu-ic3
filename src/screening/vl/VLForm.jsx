import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Submit, Obs } from '@openmrs/react-components';
import { Alert, Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import Form from '../../form/Form';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";

let VLForm = (props) => {

  const formContent = (
    <Grid>
      { (typeof props.patient !== 'undefined') &&
      (typeof props.patient.alert !== 'undefined') &&
      <Row>
        <FormGroup controlId="formAlert">
          <Col
            componentClass={ControlLabel}
            sm={2}
          >
            Alert
          </Col>
          <Col
            sm={4}
          >
            <Alert bsStyle="danger">
              { props.patient.alert }
            </Alert>
          </Col>
        </FormGroup>
      </Row>
      }

      { (typeof props.patient !== 'undefined') &&
      (typeof props.patient.actions !== 'undefined') && (props.patient.actions !== props.patient.alert) &&
      <Row>
        <FormGroup controlId="formAction">
          <Col
            componentClass={ControlLabel}
            sm={2}
          >
            Action
          </Col>
          <Col sm={4}>
            <Alert bsStyle="warning">
              { props.patient.actions }
            </Alert>
          </Col>
        </FormGroup>
      </Row>
      }

      <Row>
        <FormGroup controlId="formBled">
          <Col componentClass={ControlLabel} sm={2}>
            Bled
          </Col>
          <Col sm={8}>
            <Obs
              concept={CONCEPTS.VIRAL_LOAD_TEST_SET.Bled.uuid}
              path="vl"
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
          <Col sm={8}>
            <Obs
              concept={CONCEPTS.VIRAL_LOAD_TEST_SET.ReasonForNoSample.uuid}
              path="vl"
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
              path="vl"
              conceptAnswers={ FORM_ANSWERS.reasonForTesting }
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
              path="vl"
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
    <Form
      afterSubmitLink="/screening/vl/queue"
      backLink="/screening/vl/queue"
      encounterType={ ENCOUNTER_TYPES.VLEncounterType }
      formContent={formContent}
      formId="vl-form"
      title="Viral Load"
    />
  );
};

const selector = formValueSelector('vl-form');

export default connect(state => {
  const bled = selector(state, 'obs|path=vl|concept=' + CONCEPTS.VIRAL_LOAD_TEST_SET.Bled.uuid);
  return {
    bled,
    patient: state.selectedPatient ? state.patients[state.selectedPatient] : null,
  };
})(VLForm);

