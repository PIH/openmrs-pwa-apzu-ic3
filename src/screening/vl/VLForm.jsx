import React from 'react';
import { connect } from 'react-redux';
import {formValueSelector, change, untouch} from 'redux-form';
import {Obs, formUtil, selectors, ObsGroup} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import ScreeningForm from "../ScreeningForm";

class VLForm extends React.PureComponent {

  componentDidUpdate(prevProps) {

    const reasonNoSampleFieldName = formUtil.obsFieldName(['vl-test-set', 'vl-reason-no-sample'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ReasonForNoSample.uuid]);
    const reasonForTestingFieldName = formUtil.obsFieldName(['vl-test-set', 'vl-reason-for-testing'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ReasonForTesting.uuid]);
    const labLocationFieldName = formUtil.obsFieldName(['vl-test-set', 'vl-lab-location'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.LabLocation.uuid]);

    // this clears out form values when the "bled" question is changed
    if (typeof this.props.bled !== 'undefined' && this.props.bled !== prevProps.bled) {
      if (this.props.bled === CONCEPTS.True.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, reasonNoSampleFieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, reasonNoSampleFieldName));
      }
      else {
        this.props.dispatch(change(this.props.formInstanceId, reasonForTestingFieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, reasonForTestingFieldName));

        this.props.dispatch(change(this.props.formInstanceId, labLocationFieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, labLocationFieldName));
      }
    }
  }

  render() {

    const formContent = (
      <Grid>
        <ObsGroup
          groupingConcept={CONCEPTS.ViralLoadTestSet}
          path="vl-test-set"
        >
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
        </ObsGroup>
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
  const bled = selector(state, formUtil.obsFieldName(['vl-test-set', 'vl-bled'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.Bled.uuid]));
  return {
    bled,
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(VLForm);

