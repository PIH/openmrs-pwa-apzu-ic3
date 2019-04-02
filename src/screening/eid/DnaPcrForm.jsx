import React from 'react';
import { connect } from 'react-redux';
import {change, formValueSelector, untouch} from 'redux-form';
import {Obs, formUtil, selectors, FormContext } from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col, Button } from 'react-bootstrap';
import {CONCEPTS, FORM_ANSWERS} from "../../constants";
import './styles/dna-pcr-form.css';

class DnaPcrForm extends React.PureComponent {
  state = {
    isAddDnaPCRResults: false,
  };

  clearField(field) {
    this.props.dispatch(change(this.props.formInstanceId, field, null));
    this.props.dispatch(untouch(this.props.formInstanceId, field));
  }

  componentDidUpdate(prevProps) {

    const { reasonNoSampleFieldName, reasonForTestingFieldName, labLocationFieldName, reasonForNoTestResultFieldName, dnaPcrTestResultFieldName } = this.props;

    // this clears out form values when the "bled" question is changed
    if (typeof this.props.sampleCollected !== 'undefined' && this.props.sampleCollected !== prevProps.sampleCollected) {
      if (this.props.sampleCollected === CONCEPTS.Yes.uuid) {
        this.clearField(reasonNoSampleFieldName);
      }
      else {
        this.clearField(reasonForNoTestResultFieldName);
        this.clearField(dnaPcrTestResultFieldName);
        this.clearField(reasonForTestingFieldName);
        this.clearField(labLocationFieldName);
      }
    }
  }

  render() {
    const { isAddDnaPCRResults } = this.state;
    const { reasonForTesting, testType, labLocation, dnaPcrTestResultFieldName, reasonForNoTestResultFieldName } = this.props;

    if (testType === CONCEPTS.HIV_DNA_PCR_TEST.uuid && reasonForTesting && labLocation) {
      this.setState({ isAddDnaPCRResults: true });
    } else {
      this.setState({ isAddDnaPCRResults: false });
      this.clearField(reasonForNoTestResultFieldName);
      this.clearField(dnaPcrTestResultFieldName);
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
          style={{ display: (typeof this.props.sampleCollected !== 'undefined') && (this.props.sampleCollected === CONCEPTS.No.uuid) ? 'block' : 'none' }}>
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
          style={{ display: (typeof this.props.sampleCollected !== 'undefined') && (this.props.sampleCollected === CONCEPTS.Yes.uuid) ? 'block' : 'none' }}>
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
          style={{ display: (typeof this.props.sampleCollected !== 'undefined') && (this.props.sampleCollected === CONCEPTS.Yes.uuid) ? 'block' : 'none' }}>
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

        <FormContext.Consumer>
          {formContext => {
            if (formContext.mode === 'edit') {
              return (<Button
                active={isAddDnaPCRResults}
              >Add DNA PCR Results</Button>); 
            }
          }}
        </FormContext.Consumer>
        <br />
        <br />

        {isAddDnaPCRResults && <span>
          <span
            style={{ display: (typeof this.props.sampleCollected !== 'undefined') && (this.props.sampleCollected === CONCEPTS.Yes.uuid) ? 'block' : 'none' }}>
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
            style={{ display: (typeof this.props.dnaPcrTestResult !== 'undefined') && (this.props.dnaPcrTestResult === CONCEPTS.DNA_PCR_TEST_RESULT_NO_RESULT.uuid) ? 'block' : 'none' }}>
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

  const sampleCollected = selector(state, formUtil.obsFieldName(['hiv-test-construct', 'dna-pcr-bled'], [CONCEPTS.HIV_TEST_CONSTRUCT, CONCEPTS.SampleCollected]));
  const dnaPcrTestResult = selector(state, formUtil.obsFieldName(['hiv-test-construct', 'dna-pcr-test-result'], [CONCEPTS.HIV_TEST_CONSTRUCT, CONCEPTS.DNA_PCR_TEST_RESULT]));
  const testType = selector(state, formUtil.obsFieldName(['hiv-test-construct', 'hiv-test-type'], [CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.HIV_TEST_TYPE.uuid]));
  const reasonForTesting = selector(state, formUtil.obsFieldName(['hiv-test-construct', 'dna-pcr-reason-for-testing'], [CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.ReasonForTesting.uuid]));
  const labLocation = selector(state, formUtil.obsFieldName(['hiv-test-construct', 'dna-pcr-lab-location'], [CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.LabLocation.uuid]));


  return {
    reasonNoSampleFieldName,
    reasonForTestingFieldName,
    labLocationFieldName,
    reasonForNoTestResultFieldName,
    dnaPcrTestResultFieldName,

    sampleCollected,
    dnaPcrTestResult,
    reasonForTesting,
    labLocation,
    testType,
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(DnaPcrForm);

