import React from 'react';
import { connect } from 'react-redux';
import {change, formValueSelector, untouch} from 'redux-form';
import {Obs, formUtil, selectors, FormContext } from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col, Button } from 'react-bootstrap';
import {CONCEPTS, FORM_ANSWERS} from "../../constants";
import './styles/dna-pcr-form.css';

class DnaPcrForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAddDnaPCRResults: false,
      isAddDnaPCRResultsClicked: false,
      isAddDnaPCRResultsActive: false,
    };

    this.handleIsAddDnaPCRResults = this.handleIsAddDnaPCRResults.bind(this);
  }

  clearField(field) {
    this.props.dispatch(change(this.props.formInstanceId, field, null));
    this.props.dispatch(untouch(this.props.formInstanceId, field));
  }

  componentDidUpdate(prevProps) {

    const { sampleCollected, reasonNoSample, reasonForTesting, labLocation, reasonForNoTestResult, dnaPcrTestResult, testType } = this.props;

    // this clears out form values when the "bled" question is changed
    if (typeof sampleCollected.value !== 'undefined' && sampleCollected.value !== prevProps.sampleCollected.value) {
      if (sampleCollected.value === CONCEPTS.Yes.uuid) {
        this.clearField(reasonNoSample.fieldName);
      } else {
        this.clearField(reasonForNoTestResult.fieldName);
        this.clearField(dnaPcrTestResult.fieldName);
        this.clearField(reasonForTesting.fieldName);
        this.clearField(labLocation.fieldName);
      }
    }

    if ((typeof testType.value !== 'undefined' && testType.value !== prevProps.testType.value) || (typeof reasonForTesting.value !== 'undefined' && reasonForTesting.value !== prevProps.reasonForTesting.value) ||
      (typeof labLocation.value !== 'undefined' && labLocation.value !== prevProps.labLocation.value)) {
      if (testType.value !== CONCEPTS.HIV_DNA_PCR_TEST.uuid || !reasonForTesting.value || !labLocation.value) {
        this.clearField(reasonForNoTestResult.fieldName);
        this.clearField(dnaPcrTestResult.fieldName);
      }
    }
  }

  handleIsAddDnaPCRResults() {
    if (!this.state.isAddDnaPCRResultsClicked) {
      this.setState({ isAddDnaPCRResultsClicked: true });
    }
    if (!this.state.isAddDnaPCRResultsActive) {
      this.setState({ isAddDnaPCRResultsActive: true });
    }
  }

  render() {
    const { isAddDnaPCRResults, isAddDnaPCRResultsClicked, isAddDnaPCRResultsActive } = this.state;
    const { reasonForTesting, testType, labLocation, dnaPcrTestResult, sampleCollected, reasonForNoTestResult } = this.props;

    if (testType.value === CONCEPTS.HIV_DNA_PCR_TEST.uuid && sampleCollected.value === CONCEPTS.Yes.uuid && reasonForTesting.value && labLocation.value) {
      this.setState({ isAddDnaPCRResults: true });
    } else {
      this.setState({ isAddDnaPCRResults: false, isAddDnaPCRResultsClicked: false, isAddDnaPCRResultsActive: false });
    }
    
    if (reasonForNoTestResult.value || dnaPcrTestResult.value) {
      this.setState({ isAddDnaPCRResultsActive: true });
    }

    const formContent = (
      <Grid>
        <Row>
          <div className="eid-form-section-title">Sample Information</div>
        </Row>
        
        <Row>
          <FormGroup controlId="formBled">
            <Col componentClass={ControlLabel} sm={2}>
              Bled
            </Col>
            <Col sm={8}>
              <Obs
                concept={CONCEPTS.SampleCollected.uuid}
                path="dna-pcr-bled"
                conceptAnswers={FORM_ANSWERS.yesNo}
              />
            </Col>
          </FormGroup>
        </Row>

        <span
          style={{ display: (typeof sampleCollected.value !== 'undefined') && (sampleCollected.value === CONCEPTS.No.uuid) ? 'block' : 'none' }}>
          <Row>
            <FormGroup controlId="formReasonForNoSample">
              <Col componentClass={ControlLabel} sm={2}>
                Reason for no sample
              </Col>
              <Col sm={10}>
                <Obs
                  concept={CONCEPTS.ReasonForNoSample.uuid}
                  path="dna-pcr-reason-no-sample"
                  conceptAnswers={FORM_ANSWERS.eidNoSampleAnswers}
                />
              </Col>
            </FormGroup>
          </Row>
        </span>

        <span
          style={{ display: (sampleCollected.value !== 'undefined') && (sampleCollected.value === CONCEPTS.Yes.uuid) ? 'block' : 'none' }}>
          <Row>
            <FormGroup controlId="formReasonForTesting">
              <Col componentClass={ControlLabel} sm={2}>
                Reason for testing
              </Col>
              <Col sm={8}>
                <Obs
                  concept={CONCEPTS.ReasonForTesting.uuid}
                  path="dna-pcr-reason-for-testing"
                  conceptAnswers={FORM_ANSWERS.dnaPcrReasonForTesting}
                />
              </Col>
            </FormGroup>
          </Row>
        </span>

        <span
          style={{ display: (sampleCollected.value !== 'undefined') && (sampleCollected.value === CONCEPTS.Yes.uuid) ? 'block' : 'none' }}>
          <Row>
            <FormGroup controlId="formLabLocation">
              <Col componentClass={ControlLabel} sm={2}>
                Laboratory
              </Col>
              <Col sm={8}>
                <Obs
                  concept={CONCEPTS.LabLocation.uuid}
                  path="dna-pcr-lab-location"
                  conceptAnswers={FORM_ANSWERS.labLocation}
                />
              </Col>
            </FormGroup>
          </Row>
        </span>

        { isAddDnaPCRResults && <span>
          <FormContext.Consumer>
            {formContext => {
              if (formContext.mode === 'edit') {
                return (<Button
                  active={isAddDnaPCRResultsActive}
                  onClick={this.handleIsAddDnaPCRResults}
                >Add DNA PCR Results</Button>); 
              }
            }}
          </FormContext.Consumer>
          <br />
          <br />
        </span>}

        { (isAddDnaPCRResultsClicked || isAddDnaPCRResultsActive) && <span>
          <span
            style={{ display: (typeof sampleCollected.value !== 'undefined') && (sampleCollected.value === CONCEPTS.Yes.uuid) ? 'block' : 'none' }}>
            <Row>
              <div className="eid-form-section-title">Result Information</div>
            </Row>

            <Row>
              <FormGroup controlId="formDnaPcrResult">
                <Col componentClass={ControlLabel} sm={2}>
                  DNA PCR Result:
                </Col>
                <Col sm={8}>
                  <Obs
                    concept={CONCEPTS.DNA_PCR_TEST_RESULT.uuid}
                    path="dna-pcr-test-result"
                    conceptAnswers={FORM_ANSWERS.dnaPcrTestResults}
                  />
                </Col>
              </FormGroup>
            </Row>
          </span>

          <span
            style={{ display: (typeof dnaPcrTestResult.value !== 'undefined') && (dnaPcrTestResult.value === CONCEPTS.DNA_PCR_TEST_RESULT_NO_RESULT.uuid) ? 'block' : 'none' }}>
            <Row>
              <FormGroup controlId="formDnaPcrResult">
                <Col componentClass={ControlLabel} sm={2}>
                  Reason for No Result:
                </Col>
                <Col bsClass="no-reason-form" sm={12}>
                  <Obs
                    concept={CONCEPTS.ReasonForNoResult.uuid}
                    path="dna-pcr-reason-for-no-result"
                    conceptAnswers={FORM_ANSWERS.ReasonForNoDnaPcrResult}
                  />
                </Col>
              </FormGroup>
            </Row>
          </span>
        </span>}
      </Grid>
    );

    return (
      <div className="dna-pcr-form">
        { formContent }
      </div>
    );
  }
};

export default connect((state, props) => {
  const selector = formValueSelector(props.formInstanceId);

  const reasonNoSampleFieldName = formUtil.obsFieldName(['hiv-test-construct', 'dna-pcr-reason-no-sample'], [CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.ReasonForNoSample.uuid]);
  const reasonForTestingFieldName = formUtil.obsFieldName(['hiv-test-construct', 'dna-pcr-reason-for-testing'], [CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.ReasonForTesting.uuid]);
  const labLocationFieldName = formUtil.obsFieldName(['hiv-test-construct', 'dna-pcr-lab-location'], [CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.LabLocation.uuid]);
  const reasonForNoTestResultFieldName = formUtil.obsFieldName(['hiv-test-construct', 'dna-pcr-reason-for-no-result'], [CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.ReasonForNoResult.uuid]);
  const dnaPcrTestResultFieldName = formUtil.obsFieldName(['hiv-test-construct', 'dna-pcr-test-result'], [CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.DNA_PCR_TEST_RESULT.uuid]);
  const sampleCollectedFieldName = formUtil.obsFieldName(['hiv-test-construct', 'dna-pcr-bled'], [CONCEPTS.HIV_TEST_CONSTRUCT, CONCEPTS.SampleCollected]);
  const testTypeFieldName = formUtil.obsFieldName(['hiv-test-construct', 'hiv-test-type'], [CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.HIV_TEST_TYPE.uuid]);

  return {
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
    reasonForNoTestResult: {
      fieldName: reasonForNoTestResultFieldName,
      value: selector(state, reasonForNoTestResultFieldName)
    },
    dnaPcrTestResult: {
      fieldName: dnaPcrTestResultFieldName,
      value: selector(state, dnaPcrTestResultFieldName)
    },
    sampleCollected: {
      value: selector(state, sampleCollectedFieldName)
    },
    testType: {
      value: selector(state, testTypeFieldName)
    },
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(DnaPcrForm);

