import React from 'react';
import {connect} from 'react-redux';
import {formValueSelector, change, untouch} from 'redux-form';
import {Obs, ObsGroup, formUtil, selectors} from '@openmrs/react-components';
import {Grid, Row, FormGroup, ControlLabel, Col} from 'react-bootstrap';
import {ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS} from "../../constants";
import ScreeningForm from "../ScreeningForm";
import "./styles/tb-test-result-form.css";

class TbTestForm extends React.PureComponent {

  clearField(field) {
    this.props.dispatch(change(this.props.formInstanceId, field, null));
    this.props.dispatch(untouch(this.props.formInstanceId, field));
  }

  componentDidUpdate(prevProps) {

    // this clears out form values when the "Sputum received" question is changed
    if (typeof this.props.sputumReceived.value !== 'undefined' && this.props.sputumReceived.value !== prevProps.sputumReceived.value) {
      if (this.props.sputumReceived.value === CONCEPTS.No.uuid) {
        this.clearField(this.props.sputumSampleQuality.fieldName);
        this.clearField(this.props.sputumLaboratoryLocation.fieldName);
        this.clearField(this.props.testType.fieldName);
        this.clearField(this.props.tbSmearResult.fieldName);
        this.clearField(this.props.genexpertResult.fieldName);
        this.clearField(this.props.tbRifampinResistance.fieldName);
        this.clearField(this.props.tbNoResultGeneexpert.fieldName);
        this.clearField(this.props.tbNoResultSmear.fieldName);
      }
    }

    if (typeof this.props.sputumSampleQuality.value !== 'undefined' && this.props.sputumSampleQuality.value !== prevProps.sputumSampleQuality.value) {
      if (this.props.sputumSampleQuality.value === CONCEPTS.unsatisfactorySampleQuality.uuid) {
        this.clearField(this.props.sputumLaboratoryLocation.fieldName);
        this.clearField(this.props.testType.fieldName);
        this.clearField(this.props.tbSmearResult.fieldName);
        this.clearField(this.props.genexpertResult.fieldName);
        this.clearField(this.props.tbRifampinResistance.fieldName);
        this.clearField(this.props.tbNoResultGeneexpert.fieldName);
        this.clearField(this.props.tbRifampinResistance.fieldName);
        this.clearField(this.props.tbNoResultSmear.fieldName);
      }
    }

    if (typeof this.props.sputumLaboratoryLocation.value !== 'undefined' && typeof prevProps.sputumLaboratoryLocation.value !== 'undefined'   // also check previous so we don't clear out on load
      && this.props.sputumLaboratoryLocation.value !== prevProps.sputumLaboratoryLocation.value) {
      this.clearField(this.props.testType.fieldName);
      this.clearField(this.props.testType.fieldName);
      this.clearField(this.props.tbSmearResult.fieldName);
      this.clearField(this.props.genexpertResult.fieldName);
      this.clearField(this.props.tbRifampinResistance.fieldName);
      this.clearField(this.props.tbNoResultGeneexpert.fieldName);
      this.clearField(this.props.tbRifampinResistance.fieldName);
      this.clearField(this.props.tbNoResultSmear.fieldName);
    }

    if (typeof this.props.testType.value !== 'undefined' && this.props.testType.value !== prevProps.testType.value) {
      if (this.props.testType.value === CONCEPTS.GeneXpert.uuid) {
        this.clearField(this.props.tbSmearResult.fieldName);
        this.clearField(this.props.tbNoResultSmear.fieldName);
      } else if (this.props.testType.value === CONCEPTS.Smear.uuid) {
        this.clearField(this.props.genexpertResult.fieldName);
        this.clearField(this.props.tbRifampinResistance.fieldName);
        this.clearField(this.props.tbNoResultGeneexpert.fieldName);
      }
    }

    if (typeof this.props.genexpertResult.value !== 'undefined' && this.props.genexpertResult.value !== prevProps.genexpertResult.value) {
      if (this.props.genexpertResult.value === CONCEPTS.TBDetected) {
        this.clearField(this.props.tbNoResultGeneexpert.fieldName);
      } else if (this.props.genexpertResult.value === CONCEPTS.TBUndetected.uuid) {
        this.clearField(this.props.tbRifampinResistance.fieldName);
        this.clearField(this.props.tbNoResultGeneexpert.fieldName);
      } else if (this.props.genexpertResult.value === CONCEPTS.ReasonForNoResult.uuid) {
        this.clearField(this.props.tbRifampinResistance.fieldName);
      }
    }

    if (typeof this.props.tbSmearResult.value !== 'undefined' && this.props.tbSmearResult.value !== prevProps.tbSmearResult.value) {
      if (this.props.tbSmearResult.value === CONCEPTS.TBSmearResult.Positive.uuid || this.props.tbSmearResult.value === CONCEPTS.TBSmearResult.Negative.uuid) {
        this.clearField(this.props.tbNoResultSmear.fieldName);
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
              Sputum Received
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <FormGroup controlId="formBled">
                <Obs
                  concept={CONCEPTS.SampleCollected.uuid}
                  conceptAnswers={FORM_ANSWERS.yesNo}
                  path="tb-sputum-received"
                />
              </FormGroup>
            </Col>
          </Row>

          <span
            style={{
              display: (this.props.sputumReceived.value === CONCEPTS.Yes.uuid) ? 'block' : 'none'
            }}
          >
            <Row>
              <Col componentClass={ControlLabel}>
             Laboratory Location
              </Col>
            </Row>
            <Row>
              <FormGroup controlId="formLabLocation">
                <Col sm={12}>
                  <Obs
                    concept={CONCEPTS.LabLocation.uuid}
                    conceptAnswers={FORM_ANSWERS.sputumLabLocation}
                    path="tb-sputum-laboratory-location"
                  />
                </Col>
              </FormGroup>
            </Row>
          </span>

          <br />

          <span
            style={{ display: (typeof this.props.sputumLaboratoryLocation.value !== 'undefined') && (this.props.sputumLaboratoryLocation.value) ? 'block' : 'none' }}
          >
            <Row>
              <Col>
                <h4 className="form-subheading" >Result Information</h4>
              </Col>
            </Row>
          </span>
          <br />

          <span
            style={{ display: (typeof this.props.sputumLaboratoryLocation.value !== 'undefined') && (this.props.sputumLaboratoryLocation.value) ? 'block' : 'none' }}
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
                    path="tb-sputum-sample-quality"
                  />
                </Col>
              </FormGroup>
            </Row>
          </span>

          <span
            style={{ display: ((this.props.sputumSampleQuality.value === CONCEPTS.satisfactorySampleQuality.uuid
              && this.props.sputumReceived.value === CONCEPTS.Yes.uuid)) ? 'block' : 'none' }}
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
                      path="tb-rifampin-resistance"
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
    [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.ReasonForNoResult]);
  const tbSmearResultField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-smear-result'],
    [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.Smear]);
  const sputumLaboratoryLocationField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-sputum-laboratory-location'],
    [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.LabLocation]);
  const tbNoResultSmearField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-no-result-smear'],
    [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.ReasonForNoResult]);
  const tbRifampinResistanceField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-rifampin-resistance'],
    [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.RifampinResistance]);

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
    tbRifampinResistance: {
      fieldName: tbRifampinResistanceField,
      value: selector(state, tbRifampinResistanceField)
    },
    tbNoResultGeneexpert: {
      fieldName: tbNoResultGeneexpertField,
      value: selector(state, tbNoResultGeneexpertField)
    },
    patient: selectors.getSelectedPatientFromStore(state)

  };
})(TbTestForm);

