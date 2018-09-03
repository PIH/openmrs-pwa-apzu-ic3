import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Submit, Obs } from '@openmrs/react-components';
import { Alert, Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import Form from '../../form/Form';
import { ENCOUNTER_TYPES, CONCEPTS } from "../../constants";

let EidForm = (props) => {

  const bledAnswers = [
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.True.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.True.name },
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.False.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.False.name },
  ];

  const noSampleAnswers = [
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.UnableToDrawBlood.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.UnableToDrawBlood.name },
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.PatientRefused.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.PatientRefused.name },
  ];

  const reasonForTesting = [
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.Routine.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.Routine.name },
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.Confirmatory.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.Confirmatory.name },
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.Target.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.Target.name },
  ];

  const labLocation = [
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.NenoGeneXpert.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.NenoGeneXpert.name },
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.CentralLaboratory.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.CentralLaboratory.name },
    { uuid: CONCEPTS.VIRAL_LOAD_TEST_SET.LisungwiGeneXpert.uuid, name: CONCEPTS.VIRAL_LOAD_TEST_SET.LisungwiGeneXpert.name },
  ];

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
              path="eid"
              conceptAnswers={ bledAnswers }
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
              path="eid"
              conceptAnswers={noSampleAnswers}
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
              path="eid"
              conceptAnswers={reasonForTesting}
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
              path="eid"
              conceptAnswers={labLocation}
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
      afterSubmitLink="/screening/eid/queue"
      backLink="/screening/eid/queue"
      encounterType={ ENCOUNTER_TYPES.EidEncounterType }
      formContent={formContent}
      title="EID"
    />
  );
};

const selector = formValueSelector('openmrs-form');

export default connect(state => {
  const bled = selector(state, 'obs|path=eid|concept=' + CONCEPTS.VIRAL_LOAD_TEST_SET.Bled.uuid);
  return {
    bled,
    patient: state.selectedPatient ? state.patients[state.selectedPatient] : null,
  };
})(EidForm);

