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
      isAddVLResultsClicked: false,
      isAddVLResultsActive: false,
    };

    this.handleAddVLResults = this.handleAddVLResults.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { reasonNoSample, reasonForTesting, labLocation, reasonForNoResult, vlNumeric, vlDetectableLowerLimit, bled, vlResult, vlLowerthanDetectableLimits } = this.props;
    if (typeof bled.value !== 'undefined' && bled.value !== prevProps.bled.value) {
      if (bled.value === CONCEPTS.True.uuid) {
        this.clearField(reasonNoSample.fieldName);
      }
      else {
        this.clearField(reasonForTesting.fieldName);
        this.clearField(labLocation.fieldName);
      }
    }

    if (typeof vlResult.value !== 'undefined' && vlResult.value !== prevProps.vlResult.value) {
      if (vlResult.value === CONCEPTS.ViralLoadResultCompleted.uuid) {
        this.clearField(reasonForNoResult.fieldName);
      }
      else {
        this.clearField(vlNumeric.fieldName);
      }
    }
    
    if (typeof vlLowerthanDetectableLimits.value !== 'undefined' && vlLowerthanDetectableLimits.value !== prevProps.vlLowerthanDetectableLimits.value) {
      if (vlLowerthanDetectableLimits === CONCEPTS.False.uuid) {
        this.clearField(vlDetectableLowerLimit.fieldName);
      }
    }
    
    if ((typeof bled.value !== 'undefined' && bled.value !== prevProps.bled.value) || (typeof reasonForTesting.value !== 'undefined' && reasonForTesting.value !== prevProps.reasonForTesting.value) ||
      (typeof labLocation.value !== 'undefined' && labLocation.value !== prevProps.labLocation.value)) {
      if (bled.value !== CONCEPTS.True.uuid || !reasonForTesting.value || !labLocation.value) {
        this.clearField(vlNumeric.fieldName);
        this.clearField(vlDetectableLowerLimit.fieldName);
        this.clearField(reasonForNoResult.fieldName);
        this.clearField(vlLowerthanDetectableLimits.fieldName);
        this.clearField(vlResult.fieldName);
      }
    }
  }

  clearField(field) {
    this.props.dispatch(change(this.props.formInstanceId, field, null));
    this.props.dispatch(untouch(this.props.formInstanceId, field));
  }

  handleAddVLResults() {
    if (!this.state.isAddVLResultsClicked) {
      this.setState({ isAddVLResultsClicked: true });
    }
    if (!this.state.isAddVLResultsActive) {
      this.setState({ isAddVLResultsActive: true });
    }
  }

  render() {
    const { vlResult, vlLowerthanDetectableLimits, reasonForTesting, labLocation, bled, reasonForNoResult, vlDetectableLowerLimit, vlNumeric } = this.props;
    const { isAddVLResults, isAddVLResultsClicked, isAddVLResultsActive } = this.state;

    if (bled.value === CONCEPTS.True.uuid && reasonForTesting.value && labLocation.value) {
      this.setState({ isAddVLResults: true });
    } else {
      this.setState({ isAddVLResults: false, isAddVLResultsClicked: false, isAddVLResultsActive: false });
    }
    
    if (vlNumeric.value || vlDetectableLowerLimit.value || reasonForNoResult.value || vlLowerthanDetectableLimits.value || vlResult.value) {
      this.setState({ isAddVLResultsActive: true });
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
            style={{ display: (typeof bled.value !== 'undefined') && (bled.value === CONCEPTS.False.uuid) ? 'block' : 'none' }}
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
            style={{ display: (typeof bled.value !== 'undefined') && (bled.value === CONCEPTS.True.uuid) ? 'block' : 'none' }}
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
            style={{ display: (typeof bled.value !== 'undefined') && (bled.value === CONCEPTS.True.uuid) ? 'block' : 'none' }}
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

          { isAddVLResults && <span>
            <FormContext.Consumer>
              {formContext => {
                if (formContext.mode === 'edit') {
                  return (<Row>
                    <Button
                      active={isAddVLResultsActive}
                      id='AddVLResults'
                      onClick={this.handleAddVLResults}
                    >Add VL Results</Button>
                  </Row>); 
                }
              }}
            </FormContext.Consumer>
            <br />
          </span>}

          { (isAddVLResultsClicked || isAddVLResultsActive) && <span>
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
              style={{ display: (typeof vlResult.value !== 'undefined') && (vlResult.value === CONCEPTS.ViralLoadResultCompleted.uuid) ? 'block' : 'none' }}
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
              style={{ display: (typeof vlResult.value !== 'undefined') && (vlResult.value === CONCEPTS.ViralLoadResultCompleted.uuid) ? 'block' : 'none' }}
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
                    style={{ display: (typeof vlLowerthanDetectableLimits.value !== 'undefined') && (vlLowerthanDetectableLimits.value === CONCEPTS.True.uuid) ? 'block' : 'none' }}
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
              style={{ display: (typeof vlResult.value !== 'undefined') && (vlResult.value === CONCEPTS.ViralLoadResultUnableToProcess.uuid) ? 'block' : 'none' }}
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
  const bledFieldName = formUtil.obsFieldName(['vl-test-set', 'vl-bled'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.Bled.uuid]);
  const reasonNoSampleFieldName  = formUtil.obsFieldName(['vl-test-set', 'vl-reason-no-sample'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ReasonForNoSample.uuid]);
  const reasonForTestingFieldName  = formUtil.obsFieldName(['vl-test-set', 'vl-reason-for-testing'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ReasonForTesting.uuid]);
  const labLocationFieldName  = formUtil.obsFieldName(['vl-test-set', 'vl-lab-location'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.LabLocation.uuid]);
  const reasonForNoResultFieldName  = formUtil.obsFieldName(['vl-test-set', 'vl-reason-for-no-result'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ReasonForNoResult.uuid]);
  const vlNumericFieldName  = formUtil.obsFieldName(['vl-test-set', 'vl-numeric'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ViralLoad.uuid]);
  const vlDetectableLowerLimitFieldName  = formUtil.obsFieldName(['vl-test-set', 'vl-detectable-lower-limit'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ViralLoadDetectablelowerLimit.uuid]);
  const vlLowerthanDetectableLimitsFieldName = formUtil.obsFieldName(['vl-test-set', 'vl-lower-than-detectable-limits'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.ViralLoadLowerThanDetectionLimit.uuid]);
  const vlResultFieldName = formUtil.obsFieldName(['vl-test-set', 'vl-result'], [CONCEPTS.ViralLoadTestSet.uuid, CONCEPTS.HIVViralLoadStatus.uuid]);

  return {
    bled: {
      fieldName: bledFieldName,
      value: selector(state, bledFieldName)
    },
    vlResult: {
      fieldName: vlResultFieldName,
      value: selector(state, vlResultFieldName)
    },
    reasonNoSample: {
      fieldName: reasonNoSampleFieldName,
      value: selector(state, reasonNoSampleFieldName)
    },
    reasonForTesting: {
      fieldName: reasonForTestingFieldName,
      value: selector(state, reasonForTestingFieldName)
    },
    labLocation: {
      fieldName: labLocationFieldName,
      value: selector(state, labLocationFieldName)
    },
    reasonForNoResult: {
      fieldName: reasonForNoResultFieldName,
      value: selector(state, reasonForNoResultFieldName)
    },
    vlNumeric: {
      fieldName: vlNumericFieldName,
      value: selector(state, vlNumericFieldName)
    },
    vlDetectableLowerLimit: {
      fieldName: vlDetectableLowerLimitFieldName,
      value: selector(state, vlDetectableLowerLimitFieldName)
    },
    vlLowerthanDetectableLimits: {
      fieldName: vlLowerthanDetectableLimitsFieldName,
      value: selector(state, vlLowerthanDetectableLimitsFieldName)
    },
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(VLForm);

