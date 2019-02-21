import React from 'react';
import { differenceInMonths } from 'date-fns';
import { connect } from 'react-redux';
import {change, formValueSelector, untouch} from 'redux-form';
import {Grid, Row, Col, FormGroup, ControlLabel} from 'react-bootstrap';
import {Obs, formUtil, selectors, ObsGroup} from '@openmrs/react-components';

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

    const testTypeFieldName = formUtil.obsFieldName(['hiv-test-construct', 'hiv-test-type'], [CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.HIV_TEST_TYPE.uuid]);
    const rapidTestResultsFieldName = formUtil.obsFieldName(['hiv-test-construct', 'rapid-test-results'], [CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.HIV_TEST_RESULTS.uuid]);
    const bledFieldName = formUtil.obsFieldName(['hiv-test-construct', 'dna-pcr-bled'], [CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.SampleCollected.uuid]);
    const reasonNoSampleFieldName = formUtil.obsFieldName(['hiv-test-construct', 'dna-pcr-reason-no-sample'], [CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.ReasonForNoSample.uuid]);
    const reasonForTestingFieldName = formUtil.obsFieldName(['hiv-test-construct', 'dna-pcr-reason-for-testing'], [CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.ReasonForTesting.uuid]);
    const labLocationFieldName = formUtil.obsFieldName(['hiv-test-construct', 'dna-pcr-lab-location'], [CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.LabLocation.uuid]);


    // this clears out form values when switching HIV TEST TYPE
    if (typeof this.props.testType !== 'undefined' && this.props.testType !== prevProps.bled) {
      if (this.props.testType === CONCEPTS.HIV_DNA_PCR_TEST.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, rapidTestResultsFieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, rapidTestResultsFieldName));
      }
      else {
        this.props.dispatch(change(this.props.formInstanceId, bledFieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, bledFieldName));

        this.props.dispatch(change(this.props.formInstanceId, reasonForTestingFieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, reasonForTestingFieldName));

        this.props.dispatch(change(this.props.formInstanceId, reasonNoSampleFieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, reasonNoSampleFieldName));

        this.props.dispatch(change(this.props.formInstanceId, labLocationFieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, labLocationFieldName));
      }
    }
    if (typeof this.props.breastfeedingAnswer !== 'undefined' && this.props.breastfeedingAnswer !== prevProps.breastfeedingAnswer) {
      if (this.props.breastfeedingAnswer !== CONCEPTS.StoppedBreastfeeding.OverSixWeeks.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, testTypeFieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, testTypeFieldName));

        this.props.dispatch(change(this.props.formInstanceId, rapidTestResultsFieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, rapidTestResultsFieldName));

        this.props.dispatch(change(this.props.formInstanceId, bledFieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, bledFieldName));

        this.props.dispatch(change(this.props.formInstanceId, reasonForTestingFieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, reasonForTestingFieldName));

        this.props.dispatch(change(this.props.formInstanceId, reasonNoSampleFieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, reasonNoSampleFieldName));

        this.props.dispatch(change(this.props.formInstanceId, labLocationFieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, labLocationFieldName));
      }
    }
  }

  render() {
    let displayFollowupQuestions = true;
    const { birthdate } = this.props.patient;

    var ageInMonths = birthdate && differenceInMonths(
      new Date(),
      new Date(birthdate)
    );

    const shouldAskBreastFedQuestion = ageInMonths > 23;
    if (shouldAskBreastFedQuestion) {
      displayFollowupQuestions = false;
    }

    const hasFollowUpQuestions = this.props.breastfeedingAnswer === CONCEPTS.StoppedBreastfeeding.OverSixWeeks.uuid;

    if (hasFollowUpQuestions) {
      displayFollowupQuestions = true;
    }
    
    const formContent = (
      <Grid>
        <ObsGroup
          groupingConcept={CONCEPTS.HIV_TEST_CONSTRUCT}
          path="hiv-test-construct"
        >
          <span style={{ display: (shouldAskBreastFedQuestion) ? 'block' : 'none' }}>
            <Row>
              <FormGroup controlId="breastfeeding">
                <Col componentClass={ControlLabel} sm={2}>
                  Breastfeeding
                </Col>
                <Col sm={8}>
                  <Obs
                    concept={CONCEPTS.BreastFeeding.uuid}
                    path="breastfeeding"
                    conceptAnswers={FORM_ANSWERS.breastfeedingAnswers}
                  />
                </Col>
              </FormGroup>
            </Row>
          </span>
          <span style={{ display: (displayFollowupQuestions) ? 'block' : 'none' }}>
            <Row>
              <FormGroup controlId="formHivTestType">
                <Col componentClass={ControlLabel} sm={2}>
                  Test Type
                </Col>
                <Col sm={8}>
                  <Obs
                    concept={CONCEPTS.HIV_TEST_TYPE.uuid}
                    path="hiv-test-type"
                    conceptAnswers={FORM_ANSWERS.eidHivTestType}
                  />
                </Col>
              </FormGroup>
            </Row>
          </span>

          <span
            style={{ display: (typeof this.props.testType !== 'undefined') && (this.props.testType === CONCEPTS.HIV_DNA_PCR_TEST.uuid) && (displayFollowupQuestions) ? 'block' : 'none' }}>
            <Row>
              <DnaPcrForm
                formInstanceId={this.props.formInstanceId}
              />
            </Row>
          </span>

          <span
            style={{ display: (typeof this.props.testType !== 'undefined') && (this.props.testType === CONCEPTS.HIV_RAPID_TEST.uuid) && (displayFollowupQuestions) ? 'block' : 'none' }}>
            <Row>
              <RapidTestForm
                formInstanceId={this.props.formInstanceId}
              />
            </Row>
          </span>
        </ObsGroup>
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
            path: ["hiv-test-construct", "hiv-test-type"],
            conceptPath: [CONCEPTS.HIV_TEST_CONSTRUCT, CONCEPTS.HIV_TEST_TYPE],
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
  const breastfeedingAnswer = selector(state, formUtil.obsFieldName(['hiv-test-construct', 'breastfeeding'], [ CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.BreastFeeding.uuid]));
  const testType = selector(state, formUtil.obsFieldName(['hiv-test-construct', 'hiv-test-type'], [CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.HIV_TEST_TYPE.uuid]));
  return {
    breastfeedingAnswer,
    testType,
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(EidForm);

