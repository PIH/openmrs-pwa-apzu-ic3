import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector, change, untouch } from 'redux-form';
import { Obs, formUtil, selectors, ObsGroup, FormContext } from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col, Button } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import ScreeningForm from "../ScreeningForm";
import { noPaddingLeftAndRight, flexBaseline, noPaddingWithMarginTop, LargeSizedNoPaddingWithMarginTop } from "../../pwaStyles";
import './styles/vl-form.css';

class VLForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAddVLResults: false,
      isAddVLResultsClicked: false
    };

    this.handleIsAddVLResults = this.handleIsAddVLResults.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { reasonNoSampleFieldName, reasonForTestingFieldName, labLocationFieldName, reasonForNoResultFieldName, vlNumericFieldName, vlDetectableLowerLimitFieldName } = this.state;
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

    if (typeof this.props.vlLowerthanDetectableLimits !== 'undefined' && this.props.vlLowerthanDetectableLimits !== prevProps.vlLowerthanDetectableLimits) {
      if (this.props.vlLowerthanDetectableLimits === CONCEPTS.False.uuid) {
        this.clearField(vlDetectableLowerLimitFieldName);
      }
    }
  }

  clearField(field) {
    this.props.dispatch(change(this.props.formInstanceId, field, null));
    this.props.dispatch(untouch(this.props.formInstanceId, field));
  }

  handleIsAddVLResults() {
    this.setState({ isAddVLResultsClicked: !this.state.isAddVLResultsClicked });
  }

  render() {
    const { vlNumericFieldName, vlDetectableLowerLimitFieldName, vlResultFieldName, vlLowerthanDetectableLimitsFieldName, vlResult, vlDetectableLowerLimit, vlLowerthanDetectableLimits } = this.props;
    const { isAddVLResults, isAddVLResultsClicked } = this.state;

    if (isAddVLResultsClicked || (this.props.bled === CONCEPTS.True.uuid && typeof this.props.reasonForTesting !== 'undefined' && typeof this.props.labLocation !== 'undefined') ||
      vlResult || vlDetectableLowerLimit || vlLowerthanDetectableLimits === CONCEPTS.True.uuid) {
      this.setState({ isAddVLResults: true });
    } else {
      this.setState({ isAddVLResults: false });
      this.clearField(vlResultFieldName);
      this.clearField(vlNumericFieldName);
      this.clearField(vlDetectableLowerLimitFieldName);
      this.clearField(vlLowerthanDetectableLimitsFieldName);
    }

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


          <FormContext.Consumer>
            {formContext => {
              if (formContext.mode === 'edit') {
                return (<Row>
                  <Button
                    active={isAddVLResults}
                    onClick={this.handleIsAddVLResults}
                  >Add VL Results</Button>
                </Row>); 
              }
            }}
          </FormContext.Consumer>
          <br />



          { isAddVLResults && <span>
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
              style={{ display: (typeof this.props.vlResult !== 'undefined') && (this.props.vlResult === CONCEPTS.ViralLoadResultCompleted.uuid) ? 'block' : 'none' }}
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
                  <ControlLabel
                    sm={1}
                    style={noPaddingLeftAndRight}
                  >
                  copies/ml
                  </ControlLabel>
                </FormGroup>
              </Row>
            </span>

            <span
              style={{ display: (typeof this.props.vlResult !== 'undefined') && (this.props.vlResult === CONCEPTS.ViralLoadResultCompleted.uuid) ? 'block' : 'none' }}
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
                      conceptAnswers={FORM_ANSWERS.trueFalse}
                      path="vl-lower-than-detectable-limits"
                    />
                  </Col>
                  <span
                    style={{ display: (typeof this.props.vlLowerthanDetectableLimits !== 'undefined') && (this.props.vlLowerthanDetectableLimits === CONCEPTS.True.uuid) ? 'block' : 'none' }}
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
              style={{ display: (typeof this.props.vlResult !== 'undefined') && (this.props.vlResult === CONCEPTS.ViralLoadResultUnableToProcess.uuid) ? 'block' : 'none' }}
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
          </span>}
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
  const vlResult = selector(state, formUtil.obsFieldName(['vl-test-set', 'vl-result'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.HIVViralLoadStatus.uuid]));
  const reasonForTesting = selector(state, formUtil.obsFieldName(['vl-test-set', 'vl-reason-for-testing'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ReasonForTesting.uuid]));
  const vlLowerthanDetectableLimits = selector(state, formUtil.obsFieldName(['vl-test-set', 'vl-lower-than-detectable-limits'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ViralLoadLowerThanDetectionLimit.uuid]));
  const vlDetectableLowerLimit  = selector(state, formUtil.obsFieldName(['vl-test-set', 'vl-detectable-lower-limit'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ViralLoadDetectablelowerLimit.uuid]));
  const labLocation = selector(state, formUtil.obsFieldName(['vl-test-set', 'vl-lab-location'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.LabLocation.uuid]));
  const reasonNoSampleFieldName  = formUtil.obsFieldName(['vl-test-set', 'vl-reason-no-sample'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ReasonForNoSample.uuid]);
  const reasonForTestingFieldName  = formUtil.obsFieldName(['vl-test-set', 'vl-reason-for-testing'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ReasonForTesting.uuid]);
  const labLocationFieldName  = formUtil.obsFieldName(['vl-test-set', 'vl-lab-location'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.LabLocation.uuid]);
  const reasonForNoResultFieldName  = formUtil.obsFieldName(['vl-test-set', 'vl-reason-for-no-result'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ReasonForNoResult.uuid]);
  const vlNumericFieldName  = formUtil.obsFieldName(['vl-test-set', 'vl-numeric'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ViralLoad.uuid]);
  const vlDetectableLowerLimitFieldName  = formUtil.obsFieldName(['vl-test-set', 'vl-detectable-lower-limit'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ViralLoadDetectablelowerLimit.uuid]);
  const vlLowerthanDetectableLimitsFieldName = formUtil.obsFieldName(['vl-test-set', 'vl-lower-than-detectable-limits'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ViralLoadLowerThanDetectionLimit.uuid]);
  const vlResultFieldName = formUtil.obsFieldName(['vl-test-set', 'vl-result'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.HIVViralLoadStatus.uuid]);

  return {
    bled,
    labLocation,
    reasonForTesting,
    vlResult,
    vlDetectableLowerLimit,
    vlResultFieldName,
    vlLowerthanDetectableLimits,
    reasonNoSampleFieldName,
    reasonForTestingFieldName,
    labLocationFieldName,
    reasonForNoResultFieldName,
    vlNumericFieldName,
    vlDetectableLowerLimitFieldName,
    vlLowerthanDetectableLimitsFieldName,
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(VLForm);

