import React from 'react';
import { connect } from 'react-redux';
import {change, formValueSelector, untouch} from 'redux-form';
import {Grid, Row, Col, FormGroup, ControlLabel} from 'react-bootstrap';
import { Obs, formUtil, selectors } from '@openmrs/react-components';

import DnaPcrForm from './DnaPcrForm';
import RapidTestForm from "./RapidTestForm";
import ScreeningForm from "../ScreeningForm";
import utils from "../../utils";
import { CONCEPTS, ENCOUNTER_TYPES, FORM_NAMES, FORM_ANSWERS } from "../../constants";


class EidForm extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      test_type: utils.getDefaultEidTestType(this.props.patient)
    };

  }

  componentDidUpdate(prevProps) {
    // this clears out form values when switching HIV TEST TYPE
    if (typeof this.props.testType !== 'undefined' && this.props.testType !== prevProps.bled) {
      if (this.props.testType === CONCEPTS.HIV_DNA_PCR_TEST.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('rapid-test-results', CONCEPTS.HIV_TEST_RESULTS.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('rapid-test-results', CONCEPTS.HIV_TEST_RESULTS.uuid)));
      }
      else {
        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('dna-pcr-bled', CONCEPTS.Bled.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('dna-pcr-bled', CONCEPTS.Bled.uuid)));

        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('dna-pcr-reason-for-testing', CONCEPTS.ReasonForTesting.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('dna-pcr-reason-for-testing', CONCEPTS.ReasonForTesting.uuid)));

        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('dna-pcr-lab-location', CONCEPTS.LabLocation.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('dna-pcr-lab-location', CONCEPTS.LabLocation.uuid)));

        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('dna-pcrdr-reason-no-sample', CONCEPTS.ReasonForNoSample.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('dna-pcrdr-reason-no-sample', CONCEPTS.ReasonForNoSample.uuid)));
      }
    }
  }

  render() {

    const formContent = (
      <Grid>
        <Row>
          <FormGroup controlId="formHivTestType">
            <Col componentClass={ControlLabel} sm={2}>
              Test Type
            </Col>
            <Col sm={8}>
              <Obs
                concept={ CONCEPTS.HIV_TEST_TYPE.uuid }
                path="hiv-test-type"
                conceptAnswers={FORM_ANSWERS.eidHivTestType}
              />
            </Col>
          </FormGroup>
        </Row>

        <span style={{ display: (typeof this.props.testType !== 'undefined') && (this.props.testType === CONCEPTS.HIV_DNA_PCR_TEST.uuid) ? 'block' : 'none' }}>
          <Row>
            <DnaPcrForm
              formInstanceId={this.props.formInstanceId}
            />
          </Row>
        </span>

        <span style={{ display: (typeof this.props.testType !== 'undefined') && (this.props.testType === CONCEPTS.HIV_RAPID_TEST.uuid) ? 'block' : 'none' }}>
          <Row>
            <RapidTestForm
              formInstanceId={this.props.formInstanceId}
            />
          </Row>
        </span>
      </Grid>
    );

    return (
      <div className="dna-pcr-form">
        <ScreeningForm
          afterSubmitLink="/screening/eid/queue"
          backLink="/screening/eid/queue"
          encounterType={ ENCOUNTER_TYPES.EidEncounterType }
          defaultValues={ this.state.test_type !== null ? [{
            type: "obs",
            path: "hiv-test-type",
            concept: CONCEPTS.HIV_TEST_TYPE.uuid,
            value: this.state.test_type
          }] : null
          }
          formContent={ formContent }
          formId={ FORM_NAMES.eidFormName }
          formInstanceId={this.props.formInstanceId}
          title=""
          toastMessage="EID HIV Test Saved"
        />
      </div>

    );
  }
}

export default connect((state, props) => {
  const selector = formValueSelector(props.formInstanceId);
  const testType = selector(state, formUtil.obsFieldName('hiv-test-type', CONCEPTS.HIV_TEST_TYPE.uuid));
  return {
    testType,
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(EidForm);

