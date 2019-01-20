import React from 'react';
import { connect } from 'react-redux';
import {formValueSelector, change, untouch} from 'redux-form';
import {Obs, formUtil, selectors} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import ScreeningForm from "../ScreeningForm";
import "./styles/tb-test-result-form.css";

class TbTestResultForm extends React.PureComponent {

  componentDidUpdate(prevProps) {
    if (typeof this.props.testType !== 'undefined' && this.props.testType !== prevProps.testType) {
      if (this.props.testType === CONCEPTS.GeneXpert.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-smear-result', CONCEPTS.Smear.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-smear-result', CONCEPTS.Smear.uuid)));

        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-no-result-smear', CONCEPTS.ReasonForNoResult.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-no-result-smear', CONCEPTS.ReasonForNoResult.uuid)));
      }
      else {
        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-genexpert-result', CONCEPTS.GeneXpert.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-genexpert-result', CONCEPTS.GeneXpert.uuid)));

        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-detected', CONCEPTS.RifampinResistance.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-detected', CONCEPTS.RifampinResistance.uuid)));

        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-no-result-genexpert', CONCEPTS.ReasonForNoResult.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-no-result-genexpert', CONCEPTS.ReasonForNoResult.uuid)));
      }
    }

    if (typeof this.props.genexpertResult !== 'undefined' && this.props.genexpertResult !== prevProps.genexpertResult) {
      if (this.props.genexpertResult === CONCEPTS.TBDetected.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-no-result-genexpert', CONCEPTS.ReasonForNoResult.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-no-result-genexpert', CONCEPTS.ReasonForNoResult.uuid)));

      }
      if (this.props.genexpertResult === CONCEPTS.TBUndetected.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-detected', CONCEPTS.RifampinResistance.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-detected', CONCEPTS.RifampinResistance.uuid)));

        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-no-result-genexpert', CONCEPTS.ReasonForNoResult.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-no-result-genexpert', CONCEPTS.ReasonForNoResult.uuid)));
      }
      if (this.props.genexpertResult === CONCEPTS.ReasonForNoResult.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-detected', CONCEPTS.RifampinResistance.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-detected', CONCEPTS.RifampinResistance.uuid)));
      }
    }


    if (typeof this.props.tbSmearResult !== 'undefined' && this.props.tbSmearResult !== prevProps.tbSmearResult) {
      if (this.props.tbSmearResult === CONCEPTS.TBSmearResult.Positive.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-no-result-smear', CONCEPTS.ReasonForNoResult.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-no-result-smear', CONCEPTS.ReasonForNoResult.uuid)));

      }
      if (this.props.tbSmearResult === CONCEPTS.TBSmearResult.Negative.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-no-result-smear', CONCEPTS.ReasonForNoResult.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-no-result-smear', CONCEPTS.ReasonForNoResult.uuid)));
      }
    }
    
  }

  render() {

    const formContent = (
      <Grid>

        <Row>
          <Col
            componentClass={ControlLabel}
          >
            TB Test Type
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <FormGroup controlId="form-tb-test-type">
              <Obs
                concept={CONCEPTS.TBTestType.uuid}
                conceptAnswers={FORM_ANSWERS.tbTestTypeanswers}
                path="tb-test-type"
              />
            </FormGroup>
          </Col>
        </Row>

        <span
          style={{ display: (typeof this.props.testType !== 'undefined') && (this.props.testType === CONCEPTS.GeneXpert.uuid) ? 'block' : 'none' }}>
          <Row>
            <Col componentClass={ControlLabel}>
              GeneXpert Result
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="formGeneXpert">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.GeneXpert.uuid}
                  conceptAnswers={FORM_ANSWERS.GeneXpertAnswers}
                  path="tb-genexpert-result"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>

        <span
          style={{ display: (typeof this.props.testType !== 'undefined') && (this.props.testType === CONCEPTS.Smear.uuid) ? 'block' : 'none' }}>
          <Row>
            <Col componentClass={ControlLabel}>
            TB Smear Result
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="formReasonForTesting">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.Smear.uuid}
                  conceptAnswers={FORM_ANSWERS.SmearAnswers}
                  path="tb-smear-result"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>

        <span
          style={{ display: (typeof this.props.genexpertResult !== 'undefined') && (this.props.genexpertResult === CONCEPTS.TBDetected.uuid) ? 'block' : 'none' }}>
          <Row>
            <Col componentClass={ControlLabel}>
              Rifampin Resistance
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="formTBDetected">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.RifampinResistance.uuid}
                  conceptAnswers={FORM_ANSWERS.RifampinResistanceAnswers}
                  path="tb-detected"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>

        <span
          style={{ display: (typeof this.props.genexpertResult !== 'undefined') && (this.props.genexpertResult === CONCEPTS.ReasonForNoResult.uuid) ? 'block' : 'none' }}>
          <Row>
            <Col componentClass={ControlLabel}>
              Reason for No Result
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="formReasonForNoResult">
              <Col
                bsClass="no-reason-form"
                sm={12}
              >
                <Obs
                  concept={CONCEPTS.ReasonForNoResult.uuid}
                  conceptAnswers={FORM_ANSWERS.ReasonForNoTBResultAnswers}
                  path="tb-no-result-genexpert"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>

        <span
          style={{ display: (typeof this.props.tbSmearResult !== 'undefined') && (this.props.tbSmearResult === CONCEPTS.TBSmearResult.NoResult.uuid) ? 'block' : 'none' }}>
          <Row>
            <Col componentClass={ControlLabel}>
              Reason for No Result
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="formReasonForNoResult">
              <Col
                bsClass="no-reason-form"
                sm={12}
              >
                <Obs
                  concept={CONCEPTS.ReasonForNoResult.uuid}
                  conceptAnswers={FORM_ANSWERS.ReasonForNoTBResultAnswers}
                  path="tb-no-result-smear"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>

      </Grid>
    );

    return (
      <ScreeningForm
        backLink="/screening/tb-test/queue"
        encounterType={ENCOUNTER_TYPES.TBTestResults}
        formContent={formContent}
        formId="tb-test-type-form"
        formInstanceId={this.props.formInstanceId}
        toastMessage="TB TEST RESULT RECORDED"
      />
    );

  }
}


export default connect((state, props) => {
  const selector = formValueSelector(props.formInstanceId);
  const testType = selector(state, formUtil.obsFieldName('tb-test-type', CONCEPTS.TBTestType.uuid));
  const genexpertResult = selector(state, formUtil.obsFieldName('tb-genexpert-result', CONCEPTS.GeneXpert.uuid));
  const tbSmearResult = selector(state, formUtil.obsFieldName('tb-smear-result', CONCEPTS.Smear.uuid));
  return {
    testType,
    genexpertResult,
    tbSmearResult,
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(TbTestResultForm);

