import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector, change, untouch } from 'redux-form';
import { Obs, ObsGroup, formUtil, selectors } from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import ScreeningForm from "../ScreeningForm";
import "./styles/tb-test-result-form.css";

class TbTestResultForm extends React.PureComponent {

  componentDidUpdate(prevProps) {

    // this clears out form values when the "Sputum received" question is changed
    if (typeof this.props.sputumReceived.value !== 'undefined' && this.props.sputumReceived.value !== prevProps.sputumReceived.value) {
      if (this.props.sputumReceived.value === CONCEPTS.False.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, this.props.sputumSampleQuality.fieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, this.props.sputumSampleQuality.fieldName));

        this.props.dispatch(change(this.props.formInstanceId, this.props.sputumLaboratoryLocation.fieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, this.props.sputumLaboratoryLocation.fieldName));
      }
      if (this.props.sputumSampleQuality.value === CONCEPTS.unsatisfactorySampleQuality.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, this.props.sputumLaboratoryLocation.fieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, this.props.sputumLaboratoryLocation.fieldName));
      }
    }

    if (typeof this.props.testType.value !== 'undefined' && this.props.testType.value !== prevProps.testType.value) {
      if (this.props.testType.value === CONCEPTS.GeneXpert.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, this.props.tbSmearResult.fieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, this.props.tbSmearResult.fieldName));

        this.props.dispatch(change(this.props.formInstanceId, this.props.tbNoResultSmear.fieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, this.props.tbNoResultSmear.fieldName));
      }
      else {
        this.props.dispatch(change(this.props.formInstanceId, this.props.genexpertResult.fieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, this.props.genexpertResult.fieldName));

        this.props.dispatch(change(this.props.formInstanceId, this.props.tbDetected.fieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, this.props.tbDetected.fieldName));

        this.props.dispatch(change(this.props.formInstanceId, this.props.tbNoResultGeneexpert.fieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, this.props.tbNoResultGeneexpert.fieldName));
      }
    }

    if (typeof this.props.genexpertResult.value !== 'undefined' && this.props.genexpertResult.value !== prevProps.genexpertResult.value) {
      if (this.props.genexpertResult === CONCEPTS.TBDetected.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, this.props.tbNoResultGeneexpert.fieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, this.props.tbNoResultGeneexpert.fieldName));

      }
      if (this.props.genexpertResult.value === CONCEPTS.TBUndetected.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, this.props.tbDetected.fieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, this.props.tbDetected.fieldName));
        
        this.props.dispatch(change(this.props.formInstanceId, this.props.tbNoResultGeneexpert.fieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, this.props.tbNoResultGeneexpert.fieldName));
      }
      if (this.props.genexpertResult.value === CONCEPTS.ReasonForNoResult.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, this.props.tbDetected.fieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, this.props.tbDetected.fieldName));
      }
    }


    if (typeof this.props.tbSmearResult.value !== 'undefined' && this.props.tbSmearResult.value !== prevProps.tbSmearResult.value) {
      if (this.props.tbSmearResult.value === CONCEPTS.TBSmearResult.Positive.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, this.props.tbNoResultSmear.fieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, this.props.tbNoResultSmear.fieldName));

      }
      if (this.props.tbSmearResult.value === CONCEPTS.TBSmearResult.Negative.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, this.props.tbNoResultSmear.fieldName, null));
        this.props.dispatch(untouch(this.props.formInstanceId, this.props.tbNoResultSmear.fieldName));
      }
    }
    
  }

  render() {

    const formContent = (
      <Grid>
        <ObsGroup
          groupingConcept={CONCEPTS.TbTest.TuberculosisTestScreeningSet}
          path="tb-test-screening-set"
        >
          <span
            style={{ display: (this.props.displaySputumSection === true) ? 'block' : 'none' }}
          >
            <Row>
              <Col
                componentClass={ControlLabel}
              >
              Sputum Received
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <FormGroup controlId="formBled">
                  <Obs
                    concept={CONCEPTS.SampleCollected.uuid}
                    conceptAnswers={FORM_ANSWERS.trueFalse}
                    path="sputum-received"
                  />
                </FormGroup>
              </Col>
            </Row>

            <span
              style={{ display: (typeof this.props.sputumReceived.value !== 'undefined') && (this.props.sputumReceived.value === CONCEPTS.True.uuid) ? 'block' : 'none' }}
            >
              <Row>
                <Col componentClass={ControlLabel}>
                Sample Quality
                </Col>
              </Row>
              <Row>
                <FormGroup controlId="formReasonForNoSample">
                  <Col sm={12}>
                    <Obs
                      concept={CONCEPTS.SampleQuality.uuid}
                      conceptAnswers={FORM_ANSWERS.sampleQualityAnswers}
                      path="sputum-sample-quality"
                    />
                  </Col>
                </FormGroup>
              </Row>
            </span>

            <span
              style={{
                display: (typeof this.props.sputumSampleQuality.value !== 'undefined' || typeof this.props.sputumReceived.value !== 'undefined') && (this.props.sputumSampleQuality.value === CONCEPTS.satisfactorySampleQuality.uuid
                && this.props.sputumReceived === CONCEPTS.True.uuid) ? 'block' : 'none'
              }}
            >
              <Row>
                <Col componentClass={ControlLabel}>
               Laboratory Location
                </Col>
              </Row>
              <Row>
                <FormGroup>
                  <Col sm={12}>
                    <Obs
                      concept={CONCEPTS.LabLocation.uuid}
                      conceptAnswers={FORM_ANSWERS.sputumLabLocation}
                      path="sputum-laboratory-location"
                    />
                  </Col>
                </FormGroup>
              </Row>
            </span>
          </span>

          <span
            style={{ display: (this.props.displayResultsSection === true) ? 'block' : 'none' }}
          >
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
              style={{ display: (typeof this.props.testType.value !== 'undefined') && (this.props.testType.value === CONCEPTS.GeneXpert.uuid) ? 'block' : 'none' }}
            >
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
              style={{ display: (typeof this.props.testType.value !== 'undefined') && (this.props.testType.value === CONCEPTS.Smear.uuid) ? 'block' : 'none' }}
            >
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
              style={{ display: (typeof this.props.genexpertResult.value !== 'undefined') && (this.props.genexpertResult.value === CONCEPTS.TBDetected.uuid) ? 'block' : 'none' }}
            >
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
              style={{ display: (typeof this.props.genexpertResult.value !== 'undefined') && (this.props.genexpertResult.value === CONCEPTS.ReasonForNoResult.uuid) ? 'block' : 'none' }}
            >
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
              style={{ display: (typeof this.props.tbSmearResult.value !== 'undefined') && (this.props.tbSmearResult.value === CONCEPTS.TBSmearResult.NoResult.uuid) ? 'block' : 'none' }}
            >
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
          </span>
        </ObsGroup>

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

  const sputumReceivedField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-sputum-received'],
    [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.SampleCollected]);
  const sputumSampleQualityField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-sputum-sample-quality'],
    [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.SampleQuality]);
  const testTypeField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-test-type'],
    [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.TBTestType]);
  const genexpertResultField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-genexpert-result'],
    [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.GeneXpert]);
  const tbNoResultGeneexpertField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-no-result-genexpert'],
    [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.ReasonForNoResult.uuid]);
  const tbSmearResultField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-smear-result'],
    [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.Smear]);
  const sputumLaboratoryLocationField = formUtil.obsFieldName(['tb-test-screening-set', 'sputum-laboratory-location'],
    [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.LabLocation.uuid]);
  const tbNoResultSmearField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-no-result-smear'],
    [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.ReasonForNoResult.uuid]);
  const tbDetectedField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-detected'],
    [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.RifampinResistance.uuid]);

  return {
    sputumReceived: {
      fieldName: sputumReceivedField,
      value: selector(state, sputumReceivedField)
    },
    sputumSampleQuality: {
      fieldName: sputumSampleQualityField,
      value: selector(state, sputumSampleQualityField)
    },
    testType: {
      fieldName: testTypeField,
      value: selector(state, testTypeField)
    },
    genexpertResult: {
      fieldName: genexpertResultField,
      value: selector(state, genexpertResultField)
    },
    tbSmearResult: {
      fieldName: tbSmearResultField,
      value: selector(state, tbSmearResultField)
    },
    sputumLaboratoryLocation: {
      fieldName: sputumLaboratoryLocationField,
      value: selector(state, sputumLaboratoryLocationField)
    },
    tbNoResultSmear: {
      fieldName: tbNoResultSmearField,
      value: selector(state, tbNoResultSmearField)
    },
    tbDetected: {
      fieldName: tbDetectedField,
      value: selector(state, tbDetectedField)
    },
    tbNoResultGeneexpert: {
      fieldName: tbNoResultGeneexpertField,
      value: selector(state, tbNoResultGeneexpertField)
    },
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(TbTestResultForm);

