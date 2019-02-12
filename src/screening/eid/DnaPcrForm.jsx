import React from 'react';
import { connect } from 'react-redux';
import {change, formValueSelector, untouch} from 'redux-form';
import {Obs, formUtil, selectors} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import {CONCEPTS, FORM_ANSWERS} from "../../constants";
import './styles/dna-pcr-form.css';

class DnaPcrForm extends React.PureComponent {

  componentDidUpdate(prevProps) {

    const reasonNoSampleFieldName = formUtil.obsFieldName(['hiv-test-construct', 'dna-pcr-reason-no-sample'], [CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.ReasonForNoSample.uuid]);
    const reasonForTestingFieldName = formUtil.obsFieldName(['hiv-test-construct', 'dna-pcr-reason-for-testing'], [CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.ReasonForTesting.uuid]);
    const labLocationFieldName = formUtil.obsFieldName(['hiv-test-construct', 'dna-pcr-lab-location'], [CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.LabLocation.uuid]);

    // this clears out form values when the "bled" question is changed
    if (typeof this.props.sampleCollected !== 'undefined' && this.props.sampleCollected !== prevProps.sampleCollected) {
      if (this.props.sampleCollected === CONCEPTS.Yes.uuid) {
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
  const sampleCollected = selector(state, formUtil.obsFieldName(['hiv-test-construct', 'dna-pcr-bled'], [CONCEPTS.HIV_TEST_CONSTRUCT, CONCEPTS.SampleCollected]));
  return {
    sampleCollected,
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(DnaPcrForm);

