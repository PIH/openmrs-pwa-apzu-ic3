import React from 'react';
import { connect } from 'react-redux';
import {formValueSelector, change, untouch} from 'redux-form';
import {Obs, formUtil, selectors} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import ScreeningForm from "../ScreeningForm";

class VLForm extends React.PureComponent {

  componentDidUpdate(prevProps) {
    // this clears out form values when the "bled" question is changed
    if (typeof this.props.bled !== 'undefined' && this.props.bled !== prevProps.bled) {
      if (this.props.bled === CONCEPTS.True.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('vl-reason-no-sample', CONCEPTS.ReasonForNoSample.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('vl-reason-no-sample', CONCEPTS.ReasonForNoSample.uuid)));
      }
      else {
        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('vl-reason-for-testing', CONCEPTS.ReasonForTesting.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('vl-reason-for-testing', CONCEPTS.ReasonForTesting.uuid)));

        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('vl-lab-location', CONCEPTS.LabLocation.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('vl-lab-location', CONCEPTS.LabLocation.uuid)));
      }
    }
  }

  render() {

    const formContent = (
      <Grid>

        <Row>
          <Col
            componentClass={ControlLabel}
          >
            Bled
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <FormGroup controlId="formBled">
              <Obs
                concept={CONCEPTS.Bled.uuid}
                conceptAnswers={FORM_ANSWERS.trueFalse}
                path="vl-bled"
              />
            </FormGroup>
          </Col>
        </Row>

        <span
          style={{ display: (typeof this.props.bled !== 'undefined') && (this.props.bled === CONCEPTS.False.uuid) ? 'block' : 'none' }}>
          <Row>
            <Col componentClass={ControlLabel}>
              Reason for no sample
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="formReasonForNoSample">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.ReasonForNoSample.uuid}
                  conceptAnswers={FORM_ANSWERS.noSampleAnswers}
                  path="vl-reason-no-sample"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>


        <span
          style={{ display: (typeof this.props.bled !== 'undefined') && (this.props.bled === CONCEPTS.True.uuid) ? 'block' : 'none' }}>
          <Row>
            <Col componentClass={ControlLabel}>
              Reason for testing
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="formReasonForTesting">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.ReasonForTesting.uuid}
                  conceptAnswers={FORM_ANSWERS.reasonForTesting}
                  path="vl-reason-for-testing"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>

        <span
          style={{ display: (typeof this.props.bled !== 'undefined') && (this.props.bled === CONCEPTS.True.uuid) ? 'block' : 'none' }}>
          <Row>
            <Col componentClass={ControlLabel}>
              Lab location
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="formLabLocation">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.LabLocation.uuid}
                  conceptAnswers={FORM_ANSWERS.labLocation}
                  path="vl-lab-location"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>

      </Grid>
    );

    return (
      <ScreeningForm
        backLink="/screening/vl/queue"
        encounterType={ENCOUNTER_TYPES.VLEncounterType}
        formContent={formContent}
        formId="vl-form"
        formInstanceId={this.props.formInstanceId}
        toastMessage="Viral Load Saved"
      />
    );

  }
}


export default connect((state, props) => {
  const selector = formValueSelector(props.formInstanceId);
  const bled = selector(state, formUtil.obsFieldName('vl-bled', CONCEPTS.Bled.uuid));
  return {
    bled,
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(VLForm);

