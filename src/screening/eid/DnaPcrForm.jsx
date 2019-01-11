import React from 'react';
import { connect } from 'react-redux';
import {change, formValueSelector, untouch} from 'redux-form';
import {Obs, formUtil, selectors} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { CONCEPTS, FORM_NAMES, FORM_ANSWERS } from "../../constants";
import './styles/dna-pcr-form.css';

class DnaPcrForm extends React.PureComponent {

  componentDidUpdate(prevProps) {
    // this clears out form values when the "bled" question is changed
    if (typeof this.props.bled !== 'undefined' && this.props.bled !== prevProps.bled) {
      if (this.props.bled === CONCEPTS.True.uuid) {
        this.props.dispatch(change(FORM_NAMES.eidFormName, formUtil.obsFieldName('dna-pcrdr-reason-no-sample', CONCEPTS.ReasonForNoSample.uuid), null));
        this.props.dispatch(untouch(FORM_NAMES.eidFormName, formUtil.obsFieldName('dna-pcrdr-reason-no-sample', CONCEPTS.ReasonForNoSample.uuid)));
      }
      else {
        this.props.dispatch(change(FORM_NAMES.eidFormName, formUtil.obsFieldName('dna-pcr-reason-for-testing', CONCEPTS.ReasonForTesting.uuid), null));
        this.props.dispatch(untouch(FORM_NAMES.eidFormName, formUtil.obsFieldName('dna-pcr-reason-for-testing', CONCEPTS.ReasonForTesting.uuid)));

        this.props.dispatch(change(FORM_NAMES.eidFormName, formUtil.obsFieldName('dna-pcr-lab-location', CONCEPTS.LabLocation.uuid), null));
        this.props.dispatch(untouch(FORM_NAMES.eidFormName, formUtil.obsFieldName('dna-pcr-lab-location', CONCEPTS.LabLocation.uuid)));
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
                concept={CONCEPTS.Bled.uuid}
                path="dna-pcr-bled"
                conceptAnswers={FORM_ANSWERS.trueFalse}
              />
            </Col>
          </FormGroup>
        </Row>

        <span style={{ display: (typeof this.props.bled !== 'undefined') && (this.props.bled === CONCEPTS.False.uuid) ? 'block' : 'none' }}>
          <Row>
            <FormGroup controlId="formReasonForNoSample">
              <Col componentClass={ControlLabel} sm={2}>
                Reason for no sample
              </Col>
              <Col sm={10}>
                <Obs
                  concept={CONCEPTS.ReasonForNoSample.uuid}
                  path="dna-pcrdr-reason-no-sample"
                  conceptAnswers={FORM_ANSWERS.eidNoSampleAnswers}
                />
              </Col>
            </FormGroup>
          </Row>
        </span>

        <span style={{ display: (typeof this.props.bled !== 'undefined') && (this.props.bled === CONCEPTS.True.uuid) ? 'block' : 'none' }}>
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

        <span style={{ display: (typeof this.props.bled !== 'undefined') && (this.props.bled === CONCEPTS.True.uuid) ? 'block' : 'none' }}>
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

const selector = formValueSelector(FORM_NAMES.eidFormName);

export default connect(state => {
  const bled = selector(state, formUtil.obsFieldName('dna-pcr-bled', CONCEPTS.Bled.uuid));
  return {
    bled,
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(DnaPcrForm);

