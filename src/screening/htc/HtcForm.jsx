import React from 'react';
import { connect } from 'react-redux';
import { Submit, Obs } from '@openmrs/react-components';
import { Alert, Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import Form from '../../form/Form';
import { ENCOUNTER_TYPES, CONCEPTS } from "../../constants";
import '../../assets/css/tabs.css';

let HtcForm = (props) => {

  const answers = [
    { uuid: CONCEPTS.HTC_RESULTS.Reactive.uuid, name: CONCEPTS.HTC_RESULTS.Reactive.name },
    { uuid: CONCEPTS.HTC_RESULTS.Non_Reactive.uuid, name: CONCEPTS.HTC_RESULTS.Non_Reactive.name },
    { uuid: CONCEPTS.HTC_RESULTS.Not_Done.uuid, name: CONCEPTS.HTC_RESULTS.Not_Done.name },
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
        <FormGroup controlId="formHtc">
          <Col componentClass={ControlLabel} sm={2}>
            Results
          </Col>
          <Col sm={8}>
            <Obs
              concept={CONCEPTS.HTC_RESULTS.uuid}
              path="htc"
              conceptAnswers={ answers }
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
    <Form
      afterSubmitLink="/screening/htc/queue"
      backLink="/screening/htc/queue"
      encounterType={ ENCOUNTER_TYPES.HTCEncounterType }
      formContent={formContent}
      title="HTC"
    />
  );
};

export default connect(state => {
  return {
    patient: state.selectedPatient ? state.patients[state.selectedPatient] : null
  };
})(HtcForm);

