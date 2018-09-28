import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import {Obs} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import PatientAlert from '../../patient/PatientAlert';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import ScreeningForm from "../ScreeningForm";

let VLForm = (props) => {

  const formContent = (
    <Grid>
      <PatientAlert/>

      <Row>
        <FormGroup controlId="formBled">
          <Col componentClass={ControlLabel} sm={2}>
            Bled
          </Col>
          <Col sm={6}>
            <Obs
              concept={CONCEPTS.VIRAL_LOAD_TEST_SET.Bled.uuid}
              path="vl-bled"
              conceptAnswers={ FORM_ANSWERS.trueFalse }
            />
          </Col>
        </FormGroup>
      </Row>

      {(typeof props.bled !== 'undefined') &&
      (props.bled === CONCEPTS.False.uuid) &&
      <Row>
        <FormGroup controlId="formReasonForNoSample">
          <Col componentClass={ControlLabel} sm={2}>
            Reason for no sample
          </Col>
          <Col sm={6}>
            <Obs
              concept={CONCEPTS.VIRAL_LOAD_TEST_SET.ReasonForNoSample.uuid}
              path="vl-reason-no-sample"
              conceptAnswers={ FORM_ANSWERS.noSampleAnswers }
            />
          </Col>
        </FormGroup>
      </Row>
      }

      {(typeof props.bled !== 'undefined') &&
      (props.bled === CONCEPTS.True.uuid) &&
      <Row>
        <FormGroup controlId="formReasonForTesting">
          <Col componentClass={ControlLabel} sm={2}>
            Reason for testing
          </Col>
          <Col sm={6}>
            <Obs
              concept={CONCEPTS.VIRAL_LOAD_TEST_SET.ReasonForTesting.uuid}
              path="vl-reason-for-testing"
              conceptAnswers={ FORM_ANSWERS.reasonForTesting }
            />
          </Col>
        </FormGroup>
      </Row>
      }

      {(typeof props.bled !== 'undefined') &&
      (props.bled === CONCEPTS.True.uuid) &&
      <Row>
        <FormGroup controlId="formLabLocation">
          <Col componentClass={ControlLabel} sm={2}>
            Laboratory
          </Col>
          <Col sm={6}>
            <Obs
              concept={CONCEPTS.VIRAL_LOAD_TEST_SET.LabLocation.uuid}
              path="vl-lab-location"
              conceptAnswers={ FORM_ANSWERS.labLocation }
            />
          </Col>
        </FormGroup>
      </Row>
      }
    </Grid>
  );

  return (
    <ScreeningForm
      encounterType={ ENCOUNTER_TYPES.VLEncounterType }
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

