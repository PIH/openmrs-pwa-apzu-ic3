import React from 'react';
import { connect } from 'react-redux';
import {change, formValueSelector, untouch} from 'redux-form';
import {Obs, formUtil, selectors} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import ScreeningForm from "../ScreeningForm";
import './styles/dna-pcr-form.css';


class DnaPcrForm extends React.PureComponent {

  componentDidUpdate(prevProps) {
    // this clears out form values when the "bled" question is changed
    if (typeof this.props.bled !== 'undefined' && this.props.bled !== prevProps.bled) {
      if (this.props.bled === CONCEPTS.True.uuid) {
        this.props.dispatch(change('dna-pcr-form', formUtil.obsFieldName('dna-pcrdr-reason-no-sample', CONCEPTS.VIRAL_LOAD_TEST_SET.ReasonForNoSample.uuid), null));
        this.props.dispatch(untouch('dna-pcr-form', formUtil.obsFieldName('dna-pcrdr-reason-no-sample', CONCEPTS.VIRAL_LOAD_TEST_SET.ReasonForNoSample.uuid)));
      }
      else {
        this.props.dispatch(change('dna-pcr-form', formUtil.obsFieldName('dna-pcr-reason-for-testing', CONCEPTS.VIRAL_LOAD_TEST_SET.ReasonForTesting.uuid), null));
        this.props.dispatch(untouch('dna-pcr-form', formUtil.obsFieldName('dna-pcr-reason-for-testing', CONCEPTS.VIRAL_LOAD_TEST_SET.ReasonForTesting.uuid)));

        this.props.dispatch(change('dna-pcr-form', formUtil.obsFieldName('dna-pcr-lab-location', CONCEPTS.VIRAL_LOAD_TEST_SET.LabLocation.uuid), null));
        this.props.dispatch(untouch('dna-pcr-form', formUtil.obsFieldName('dna-pcr-lab-location', CONCEPTS.VIRAL_LOAD_TEST_SET.LabLocation.uuid)));
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
                concept={CONCEPTS.VIRAL_LOAD_TEST_SET.Bled.uuid}
                path="dna-pcr-bled"
                conceptAnswers={FORM_ANSWERS.trueFalse}
              />
            </Col>
          </FormGroup>
        </Row>

        {(typeof this.props.bled !== 'undefined') &&
        (this.props.bled === CONCEPTS.False.uuid) &&
        <Row>
          <FormGroup controlId="formReasonForNoSample">
            <Col componentClass={ControlLabel} sm={2}>
              Reason for no sample
            </Col>
            <Col sm={10}>
              <Obs
                concept={CONCEPTS.VIRAL_LOAD_TEST_SET.ReasonForNoSample.uuid}
                path="dna-pcrdr-reason-no-sample"
                conceptAnswers={FORM_ANSWERS.eidNoSampleAnswers}
              />
            </Col>
          </FormGroup>
        </Row>
        }

        {(typeof this.props.bled !== 'undefined') &&
        (this.props.bled === CONCEPTS.True.uuid) &&
        <Row>
          <FormGroup controlId="formReasonForTesting">
            <Col componentClass={ControlLabel} sm={2}>
              Reason for testing
            </Col>
            <Col sm={8}>
              <Obs
                concept={CONCEPTS.VIRAL_LOAD_TEST_SET.ReasonForTesting.uuid}
                path="dna-pcr-reason-for-testing"
                conceptAnswers={FORM_ANSWERS.dnaPcrReasonForTesting}
              />
            </Col>
          </FormGroup>
        </Row>
        }

        {(typeof this.props.bled !== 'undefined') &&
        (this.props.bled === CONCEPTS.True.uuid) &&
        <Row>
          <FormGroup controlId="formLabLocation">
            <Col componentClass={ControlLabel} sm={2}>
              Laboratory
            </Col>
            <Col sm={8}>
              <Obs
                concept={CONCEPTS.VIRAL_LOAD_TEST_SET.LabLocation.uuid}
                path="dna-pcr-lab-location"
                conceptAnswers={FORM_ANSWERS.labLocation}
              />
            </Col>
          </FormGroup>
        </Row>
        }
      </Grid>
    );

    return (
      <div className="dna-pcr-form">
        <ScreeningForm
          afterSubmitLink="/screening/eid/queue"
          backLink="/screening/eid/queue"
          encounterType={ENCOUNTER_TYPES.DnaPcrEncounterType}
          formContent={formContent}
          formId="dna-pcr-form"
          formInstanceId="dna-pcr-form"
          title=""
          toastMessage="DNA-PCR Saved"
        />
      </div>
    );
  }
};

const selector = formValueSelector('dna-pcr-form');

export default connect(state => {
  const bled = selector(state, formUtil.obsFieldName('dna-pcr-bled', CONCEPTS.VIRAL_LOAD_TEST_SET.Bled.uuid));
  return {
    bled,
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(DnaPcrForm);

