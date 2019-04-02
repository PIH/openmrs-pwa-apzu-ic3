import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector, change, untouch } from 'redux-form';
import { Obs, ObsGroup, formUtil, selectors, FormContext } from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col, Button } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import ScreeningForm from "../ScreeningForm";
import "./styles/tb-test-result-form.css";

class TbTestForm extends React.PureComponent {
  state = {
    isAddTbTestResults: false,
  };

  clearField(field) {
    this.props.dispatch(change(this.props.formInstanceId, field, null));
    this.props.dispatch(untouch(this.props.formInstanceId, field));
  }

  setField(field, value) {
    this.props.dispatch(change(this.props.formInstanceId, field, value));
  }

  hasChanged(field, props, prevProps) {
    return typeof props[field].value !== 'undefined' && typeof prevProps[field].value !== 'undefined'
      && this.props[field].value !== prevProps[field].value;
  }

  componentDidUpdate(prevProps) {

    // this clears out form values when the "Sputum received" question is changed
    if (this.hasChanged('sputumReceived', this.props, prevProps)) {

      if (this.props.sputumReceived.value === CONCEPTS.No.uuid) {
        this.clearField(this.props.sputumLaboratoryLocation.fieldName);
        this.clearField(this.props.sputumSampleQuality.fieldName);
        this.clearField(this.props.testType.fieldName);
        this.clearField(this.props.tbSmearResult.fieldName);
        this.clearField(this.props.genexpertResult.fieldName);
        this.clearField(this.props.tbRifampinResistance.fieldName);
        this.clearField(this.props.tbNoResultGeneexpert.fieldName);
        this.clearField(this.props.tbNoResultSmear.fieldName);
      }
    }

    if (this.hasChanged('sputumLaboratoryLocation', this.props, prevProps)) {
      this.clearField(this.props.sputumSampleQuality.fieldName);
      this.clearField(this.props.testType.fieldName);
      this.clearField(this.props.tbSmearResult.fieldName);
      this.clearField(this.props.genexpertResult.fieldName);
      this.clearField(this.props.tbRifampinResistance.fieldName);
      this.clearField(this.props.tbNoResultGeneexpert.fieldName);
      this.clearField(this.props.tbRifampinResistance.fieldName);
      this.clearField(this.props.tbNoResultSmear.fieldName);
    }

    if (this.hasChanged('sputumSampleQuality', this.props, prevProps)) {
      if (this.props.sputumSampleQuality.value === CONCEPTS.unsatisfactorySampleQuality.uuid) {
        this.clearField(this.props.testType.fieldName);
        this.clearField(this.props.tbSmearResult.fieldName);
        this.clearField(this.props.genexpertResult.fieldName);
        this.clearField(this.props.tbRifampinResistance.fieldName);
        this.clearField(this.props.tbNoResultGeneexpert.fieldName);
        this.clearField(this.props.tbRifampinResistance.fieldName);
        this.clearField(this.props.tbNoResultSmear.fieldName);
      } else if (this.props.sputumSampleQuality.value === CONCEPTS.satisfactorySampleQuality.uuid) {
        if (this.props.sputumLaboratoryLocation.value === CONCEPTS.LisungwiGeneXpert.uuid
          || this.props.sputumLaboratoryLocation.value === CONCEPTS.NenoGeneXpert.uuid) {
          this.setField(this.props.testType.fieldName, CONCEPTS.GeneXpert.uuid);
        } else if (this.props.sputumLaboratoryLocation.value === CONCEPTS.microscopy.uuid) {
          this.setField(this.props.testType.fieldName, CONCEPTS.Smear.uuid);
        }
      }
    }

    if (this.hasChanged('testType', this.props, prevProps)) {
      if (this.props.testType.value === CONCEPTS.GeneXpert.uuid) {
        this.clearField(this.props.tbSmearResult.fieldName);
        this.clearField(this.props.tbNoResultSmear.fieldName);
      } else if (this.props.testType.value === CONCEPTS.Smear.uuid) {
        this.clearField(this.props.genexpertResult.fieldName);
        this.clearField(this.props.tbRifampinResistance.fieldName);
        this.clearField(this.props.tbNoResultGeneexpert.fieldName);
      }
    }

    if (this.hasChanged('genexpertResult', this.props, prevProps)) {
      if (this.props.genexpertResult.value === CONCEPTS.TBDetected) {
        this.clearField(this.props.tbNoResultGeneexpert.fieldName);
      } else if (this.props.genexpertResult.value === CONCEPTS.TBUndetected.uuid) {
        this.clearField(this.props.tbRifampinResistance.fieldName);
        this.clearField(this.props.tbNoResultGeneexpert.fieldName);
      } else if (this.props.genexpertResult.value === CONCEPTS.ReasonForNoResult.uuid) {
        this.clearField(this.props.tbRifampinResistance.fieldName);
      }
    }

  }

  render() {
    const { isAddTbTestResults } = this.state;
    const { sputumReceived, labLocation, sputumSampleQuality, testType, genexpertResult, tbSmearResult, sputumLaboratoryLocation, tbNoResultSmear, tbRifampinResistance, tbNoResultGeneexpert } = this.props;

    if (sputumReceived.value === CONCEPTS.Yes.uuid && labLocation.value) {
      this.setState({ isAddTbTestResults: true });
    } else {
      this.setState({ isAddTbTestResults: false });
      // this.clearField('jed');
      // this.clearField(this.props.sputumSampleQuality.fieldName);
      // this.clearField(testType.fieldName);
      // this.clearField(genexpertResult);
      // this.clearField(genexpertResult.fieldName);
      // this.clearField(tbSmearResult.fieldName);
      // this.clearField(sputumLaboratoryLocation.fieldName);
      // this.clearField(tbNoResultSmear.fieldName);
      // this.clearField(tbRifampinResistance.fieldName);
      // this.clearField(tbNoResultGeneexpert.fieldName);
    }

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

          <FormContext.Consumer>
            {formContext => {
              if (formContext.mode === 'edit') {
                return (<Row>
                  <Button
                    active={isAddTbTestResults}
                  >Add TB test Results</Button>
                </Row>); 
              }
            }}
          </FormContext.Consumer>
          <br />

          {isAddTbTestResults && <span>
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
                        conceptAnswers={FORM_ANSWERS.ReasonForNoResult}
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
                        conceptAnswers={FORM_ANSWERS.ReasonForNoResult}
                        path="tb-no-result-smear"
                      />
                    </Col>
                  </FormGroup>
                </Row>
              </span>
            </span>
          </span>}
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

  const sputumReceivedField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-sputum-received'], [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.SampleCollected]);
  const labLocationField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-sputum-laboratory-location'], [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.LabLocation]);
  const sputumSampleQualityField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-sputum-sample-quality'], [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.SampleQuality]);
  const testTypeField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-test-type'], [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.TBTestType]);
  const genexpertResultField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-genexpert-result'], [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.GeneXpert]);
  const tbNoResultGeneexpertField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-no-result-genexpert'], [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.ReasonForNoResult]);
  const tbSmearResultField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-smear-result'], [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.Smear]);
  const sputumLaboratoryLocationField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-sputum-laboratory-location'], [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.LabLocation]);
  const tbNoResultSmearField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-no-result-smear'], [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.ReasonForNoResult]);
  const tbRifampinResistanceField = formUtil.obsFieldName(['tb-test-screening-set', 'tb-rifampin-resistance'], [CONCEPTS.TbTest.TuberculosisTestScreeningSet, CONCEPTS.RifampinResistance]);

  return {
    sputumReceived: {
      fieldName: sputumReceivedField,
      value: selector(state, sputumReceivedField)
    },
    labLocation: {
      fieldName: labLocationField,
      value: selector(state, labLocationField)
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

