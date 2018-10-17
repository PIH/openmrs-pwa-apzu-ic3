import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Obs } from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import PatientAlert from '../../patient/PatientAlert';
import PatientLabTests from '../../patient/PatientLabTests';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import ScreeningForm from "../ScreeningForm";

let VLForm = (props) => {

  const formContent = (
    <Grid>
      <Row>
        <Col sm={8}>
          <PatientAlert />

          <Row>
            <FormGroup controlId="formBled">
              <Col
                componentClass={ControlLabel}
                sm={2}
              >
            Bled
              </Col>
              <Col sm={6}>
                <Obs
                  concept={CONCEPTS.VIRAL_LOAD_TEST_SET.Bled.uuid}
                  conceptAnswers={FORM_ANSWERS.trueFalse}
                  path="vl-bled"
                />
              </Col>
            </FormGroup>
          </Row>

          {(typeof props.bled !== 'undefined') &&
      (props.bled === CONCEPTS.False.uuid) &&
      <Row>
        <FormGroup controlId="formReasonForNoSample">
          <Col
            componentClass={ControlLabel}
            sm={2}
          >
            Reason for no sample
          </Col>
          <Col sm={6}>
            <Obs
              concept={CONCEPTS.VIRAL_LOAD_TEST_SET.ReasonForNoSample.uuid}
              conceptAnswers={FORM_ANSWERS.noSampleAnswers}
              path="vl-reason-no-sample"
            />
          </Col>
        </FormGroup>
      </Row>
          }

          {(typeof props.bled !== 'undefined') &&
      (props.bled === CONCEPTS.True.uuid) &&
      <Row>
        <FormGroup controlId="formReasonForTesting">
          <Col
            componentClass={ControlLabel}
            sm={2}
          >
            Reason for testing
          </Col>
          <Col sm={6}>
            <Obs
              concept={CONCEPTS.VIRAL_LOAD_TEST_SET.ReasonForTesting.uuid}
              conceptAnswers={FORM_ANSWERS.reasonForTesting}
              path="vl-reason-for-testing"
            />
          </Col>
        </FormGroup>
      </Row>
          }

          {(typeof props.bled !== 'undefined') &&
      (props.bled === CONCEPTS.True.uuid) &&
      <Row>
        <FormGroup controlId="formLabLocation">
          <Col
            componentClass={ControlLabel}
            sm={2}
          >
            Laboratory
          </Col>
          <Col sm={6}>
            <Obs
              concept={CONCEPTS.VIRAL_LOAD_TEST_SET.LabLocation.uuid}
              conceptAnswers={FORM_ANSWERS.labLocation}
              path="vl-lab-location"
            />
          </Col>
        </FormGroup>
      </Row>
          }
        </Col>
        <Col sm={4}>
          <PatientLabTests />
        </Col>
      </Row>
    </Grid>
  );

  return (
    <ScreeningForm
      backLink="/screening/vl/queue"
      encounterType={ENCOUNTER_TYPES.VLEncounterType}
      formContent={formContent}
      formId="vl-form"
      formInstanceId="vl-form"
      title="Viral Load"
    />
  );
};

const selector = formValueSelector('vl-form');

export default connect(state => {
  const bled = selector(state, 'obs|path=vl-bled|concept=' + CONCEPTS.VIRAL_LOAD_TEST_SET.Bled.uuid);
  return {
    bled,
    patient: state.openmrs.selectedPatient ? state.openmrs.patients[state.openmrs.selectedPatient] : null,
  };
})(VLForm);

