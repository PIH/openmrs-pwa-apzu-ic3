import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector, change, untouch } from 'redux-form';
import { Obs, formUtil, selectors, ObsGroup } from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import ScreeningForm from "../ScreeningForm";
import { noPaddingLeftAndRight, flexBaseline, noPaddingWithMarginTop, LargeSizedNoPaddingWithMarginTop } from "../../pwaStyles";
import './styles/vl-form.css';

class VLForm extends React.PureComponent {
  componentDidUpdate(prevProps) {

    const reasonNoSampleFieldName = formUtil.obsFieldName(['vl-test-set', 'vl-reason-no-sample'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ReasonForNoSample.uuid]);
    const reasonForTestingFieldName = formUtil.obsFieldName(['vl-test-set', 'vl-reason-for-testing'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ReasonForTesting.uuid]);
    const labLocationFieldName = formUtil.obsFieldName(['vl-test-set', 'vl-lab-location'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.LabLocation.uuid]);
    const reasonForNoResultFieldName = formUtil.obsFieldName(['vl-test-set', 'vl-reason-for-no-result'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ReasonForNoResult.uuid]);
    const vlNumericFieldName = formUtil.obsFieldName(['vl-test-set', 'vl-numeric'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ViralLoad.uuid]);

    if (typeof this.props.bled !== 'undefined' && this.props.bled !== prevProps.bled) {
      if (this.props.bled === CONCEPTS.True.uuid) {
        this.clearField(reasonNoSampleFieldName);
      }
      else {
        this.clearField(reasonForTestingFieldName);
        this.clearField(labLocationFieldName);
      }
    }

    if (typeof this.props.vlResultFieldName !== 'undefined' && this.props.vlResultFieldName !== prevProps.vlResultFieldName) {
      if (this.props.vlResultFieldName === CONCEPTS.ViralLoadResultCompleted.uuid) {
        this.clearField(reasonForNoResultFieldName);
      }
      else {
        this.clearField(vlNumericFieldName);
      }
    }
  }

  clearField(field) {
    this.props.dispatch(change(this.props.formInstanceId, field, null));
    this.props.dispatch(untouch(this.props.formInstanceId, field));
  }

  render() {
    const formContent = (
      <Grid className="vl-form">
        <ObsGroup
          groupingConcept={CONCEPTS.ViralLoadTestSet}
          path="vl-test-set"
        >
          <span>
            <Row>
              <Col>
                <h4 className="form-subheading">Sample Information</h4>
              </Col>
            </Row>
          </span>
          <br />
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
            style={{ display: (typeof this.props.bled !== 'undefined') && (this.props.bled === CONCEPTS.False.uuid) ? 'block' : 'none' }}
          >
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
            style={{ display: (typeof this.props.bled !== 'undefined') && (this.props.bled === CONCEPTS.True.uuid) ? 'block' : 'none' }}
          >
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
            style={{ display: (typeof this.props.bled !== 'undefined') && (this.props.bled === CONCEPTS.True.uuid) ? 'block' : 'none' }}
          >
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

          <span>
            <Row>
              <Col>
                <h4 className="form-subheading">Result Information</h4>
              </Col>
            </Row>
          </span>
          <br />

          <Row>
            <Col componentClass={ControlLabel}>
              Viral Load Result:
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="formVLResult">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.HIVViralLoadStatus.uuid}
                  conceptAnswers={FORM_ANSWERS.ViralLoadResult}
                  path="vl-result"
                />
              </Col>
            </FormGroup>
          </Row>

          <span
            style={{ display: (typeof this.props.vlResultFieldName !== 'undefined') && (this.props.vlResultFieldName === CONCEPTS.ViralLoadResultCompleted.uuid) ? 'block' : 'none' }}
          >
            <Row>
              <div>
                <ControlLabel sm={6}>
                  Viral Load
                </ControlLabel>
              </div>
              <FormGroup style={flexBaseline}>
                <Col sm={2}>
                  <Obs
                    concept={CONCEPTS.ViralLoad}
                    path="vl-numeric"
                    placeholder="value"
                  />
                </Col>
                <ControlLabel sm={1} style={noPaddingLeftAndRight}>
                  copies/ml
                </ControlLabel>
              </FormGroup>
            </Row>
          </span>

          <span
            style={{ display: (typeof this.props.vlResultFieldName !== 'undefined') && (this.props.vlResultFieldName === CONCEPTS.ViralLoadResultCompleted.uuid) ? 'block' : 'none' }}
          >
            <Row>
              <Col componentClass={ControlLabel}>
                Lower than Detectable Limit
              </Col>
            </Row>
            <Row>
              <FormGroup controlId="formLabLocation">
                <Col xs={3} >
                    <Obs
                      concept={CONCEPTS.ViralLoadLowerThanDetectionLimit.uuid}
                      conceptAnswers={[CONCEPTS.ViralLoadLowerThanDetectionLimit, CONCEPTS.ViralLoadNotLowerThanDetectionLimit]}
                      path="vl-lower-than-detectable-limits"
                    />
                </Col>
                <span
                  style={{ display: (typeof this.props.vlLowerthanDetectableLimitsFieldName !== 'undefined') && (this.props.vlLowerthanDetectableLimitsFieldName === CONCEPTS.ViralLoadLowerThanDetectionLimit.uuid) ? 'block' : 'none' }}
                >
                  <Col xs={2}>
                    <ControlLabel style={LargeSizedNoPaddingWithMarginTop}>
                      less than
                    </ControlLabel>
                  </Col>
                  <Col xs={3}>
                    <Obs
                      concept={CONCEPTS.ViralLoadDetectablelowerLimit}
                      path="vl-detectable-lower-limit"
                      placeholder="value"
                    />
                  </Col>
                  <Col xs={2}>
                    <ControlLabel style={noPaddingWithMarginTop}>
                      copies/ml
                    </ControlLabel>
                  </Col>
                </span>
              </FormGroup>
            </Row>
          </span>

          <span
            style={{ display: (typeof this.props.vlResultFieldName !== 'undefined') && (this.props.vlResultFieldName === CONCEPTS.ViralLoadResultUnableToProcess.uuid) ? 'block' : 'none' }}
          >
            <Row>
              <Col componentClass={ControlLabel}>
              Reason for No Result:
              </Col>
            </Row>
            <Row>
              <FormGroup controlId="formReasonForNoResult">
                <Col
                  sm={12}
                >
                  <Obs
                    concept={CONCEPTS.ReasonForNoResult.uuid}
                    conceptAnswers={FORM_ANSWERS.ReasonForNoResult}
                    path="vl-reason-for-no-result"
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
  const vlResultFieldName = selector(state, formUtil.obsFieldName(['vl-test-set', 'vl-result'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.HIVViralLoadStatus.uuid]));
  const vlLowerthanDetectableLimitsFieldName = selector(state, formUtil.obsFieldName(['vl-test-set', 'vl-lower-than-detectable-limits'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ViralLoadLowerThanDetectionLimit.uuid]));


  return {
    bled,
    vlResultFieldName,
    vlLowerthanDetectableLimitsFieldName,
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(VLForm);

