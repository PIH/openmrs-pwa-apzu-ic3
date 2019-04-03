import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector, change, untouch } from 'redux-form';
import { Obs, ObsGroup, formUtil, selectors, FormContext } from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col, Button } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import ScreeningForm from "../ScreeningForm";
import "./styles/tb-test-result-form.css";

class TbTestForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAddTbTestResults: false,
      isAddTbTestResultsClicked: false,
      isAddTbTestResultsActive: false,
    };

    this.handleIsAddTbTestResults = this.handleIsAddTbTestResults.bind(this);
  }

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

    const { labLocation, sputumSampleQuality, testType, tbSmearResult, genexpertResult, tbRifampinResistance, tbNoResultGeneexpert, tbNoResultSmear, sputumReceived } = this.props;

    // this clears out form values when the "Sputum received" question is changed
    if (this.hasChanged('sputumReceived', this.props, prevProps)) {

      if (sputumReceived.value === CONCEPTS.No.uuid) {
        this.clearField(labLocation.fieldName);
        this.clearField(sputumSampleQuality.fieldName);
        this.clearField(testType.fieldName);
        this.clearField(tbSmearResult.fieldName);
        this.clearField(genexpertResult.fieldName);
        this.clearField(tbRifampinResistance.fieldName);
        this.clearField(tbNoResultGeneexpert.fieldName);
        this.clearField(tbNoResultSmear.fieldName);
      }
    }

    if (this.hasChanged('labLocation', this.props, prevProps)) {
      this.clearField(sputumSampleQuality.fieldName);
      this.clearField(testType.fieldName);
      this.clearField(tbSmearResult.fieldName);
      this.clearField(genexpertResult.fieldName);
      this.clearField(tbRifampinResistance.fieldName);
      this.clearField(tbNoResultGeneexpert.fieldName);
      this.clearField(tbRifampinResistance.fieldName);
      this.clearField(tbNoResultSmear.fieldName);
    }

    if (this.hasChanged('sputumSampleQuality', this.props, prevProps)) {
      if (sputumSampleQuality.value === CONCEPTS.unsatisfactorySampleQuality.uuid) {
        this.clearField(testType.fieldName);
        this.clearField(tbSmearResult.fieldName);
        this.clearField(genexpertResult.fieldName);
        this.clearField(tbRifampinResistance.fieldName);
        this.clearField(tbNoResultGeneexpert.fieldName);
        this.clearField(tbRifampinResistance.fieldName);
        this.clearField(tbNoResultSmear.fieldName);
      } else if (sputumSampleQuality.value === CONCEPTS.satisfactorySampleQuality.uuid) {
        if (labLocation.value === CONCEPTS.LisungwiGeneXpert.uuid
          || labLocation.value === CONCEPTS.NenoGeneXpert.uuid) {
          this.setField(testType.fieldName, CONCEPTS.GeneXpert.uuid);
        } else if (labLocation.value === CONCEPTS.microscopy.uuid) {
          this.setField(testType.fieldName, CONCEPTS.Smear.uuid);
        }
      }
    }

    if (this.hasChanged('testType', this.props, prevProps)) {
      if (testType.value === CONCEPTS.GeneXpert.uuid) {
        this.clearField(tbSmearResult.fieldName);
        this.clearField(tbNoResultSmear.fieldName);
      } else if (testType.value === CONCEPTS.Smear.uuid) {
        this.clearField(genexpertResult.fieldName);
        this.clearField(tbRifampinResistance.fieldName);
        this.clearField(tbNoResultGeneexpert.fieldName);
      }
    }

    if (this.hasChanged('genexpertResult', this.props, prevProps)) {
      if (genexpertResult.value === CONCEPTS.TBDetected) {
        this.clearField(tbNoResultGeneexpert.fieldName);
      } else if (genexpertResult.value === CONCEPTS.TBUndetected.uuid) {
        this.clearField(tbRifampinResistance.fieldName);
        this.clearField(tbNoResultGeneexpert.fieldName);
      } else if (genexpertResult.value === CONCEPTS.ReasonForNoResult.uuid) {
        this.clearField(tbRifampinResistance.fieldName);
      }
    }

    if ((typeof sputumReceived.value !== 'undefined' && sputumReceived.value !== prevProps.sputumReceived.value) || (typeof labLocation.value !== 'undefined' && labLocation.value !== prevProps.labLocation.value)) {
      if (sputumReceived.value !== CONCEPTS.Yes.uuid || !labLocation.value) { 
        this.clearField(sputumSampleQuality.fieldName);
        this.clearField(testType.fieldName);
        this.clearField(tbSmearResult.fieldName);
        this.clearField(genexpertResult.fieldName);
        this.clearField(tbRifampinResistance.fieldName);
        this.clearField(tbNoResultGeneexpert.fieldName);
        this.clearField(tbNoResultSmear.fieldName);
      }
    }
  }

  handleIsAddTbTestResults() {
    if (!this.state.isAddTbTestResultsClicked) {
      this.setState({ isAddTbTestResultsClicked: true });
    }
    if (!this.state.isAddTbTestResultsActive) {
      this.setState({ isAddTbTestResultsActive: true });
    }
  }

  render() {
    const { isAddTbTestResults, isAddTbTestResultsClicked, isAddTbTestResultsActive } = this.state;
    const { sputumReceived, sputumSampleQuality, testType, genexpertResult, tbSmearResult, labLocation, formInstanceId, tbNoResultGeneexpert, tbNoResultSmear, tbRifampinResistance } = this.props;

    if (sputumReceived.value === CONCEPTS.Yes.uuid && labLocation.value) {
      this.setState({ isAddTbTestResults: true });
    } else {
      this.setState({ isAddTbTestResults: false, isAddTbTestResultsClicked: false, isAddTbTestResultsActive: false });
    }

    if (sputumSampleQuality.value || testType.value || genexpertResult.value|| tbNoResultGeneexpert.value || tbSmearResult.value || tbNoResultSmear.value || tbRifampinResistance.value) {
      this.setState({ isAddTbTestResultsActive: true });
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
              display: (sputumReceived.value === CONCEPTS.Yes.uuid) ? 'block' : 'none'
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

          { isAddTbTestResults && <span>
            <FormContext.Consumer>
              {formContext => {
                if (formContext.mode === 'edit') {
                  return (<Row>
                    <Button
                      active={isAddTbTestResultsActive}
                      onClick={this.handleIsAddTbTestResults}
                    >Add TB test Results</Button>
                  </Row>); 
                }
              }}
            </FormContext.Consumer>
            <br />
          </span>}
          { (isAddTbTestResultsClicked || isAddTbTestResultsActive) && <span>
            <span
              style={{ display: (typeof labLocation.value !== 'undefined') && (labLocation.value) ? 'block' : 'none' }}
            >
              <Row>
                <Col>
                  <h4 className="form-subheading" >Result Information</h4>
                </Col>
              </Row>
            </span>
            <br />

            <span
              style={{ display: (typeof labLocation.value !== 'undefined') && (labLocation.value) ? 'block' : 'none' }}
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
              style={{ display: ((sputumSampleQuality.value === CONCEPTS.satisfactorySampleQuality.uuid
                && sputumReceived.value === CONCEPTS.Yes.uuid)) ? 'block' : 'none' }}
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
                style={{ display: (typeof testType.value !== 'undefined') && (testType.value === CONCEPTS.GeneXpert.uuid) ? 'block' : 'none' }}
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
                style={{ display: (typeof testType.value !== 'undefined') && (testType.value === CONCEPTS.Smear.uuid) ? 'block' : 'none' }}
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
                style={{ display: (typeof genexpertResult.value !== 'undefined') && (genexpertResult.value === CONCEPTS.TBDetected.uuid) ? 'block' : 'none' }}
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
                style={{ display: (typeof genexpertResult.value !== 'undefined') && (genexpertResult.value === CONCEPTS.ReasonForNoResult.uuid) ? 'block' : 'none' }}
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
                style={{ display: (typeof tbSmearResult.value !== 'undefined') && (tbSmearResult.value === CONCEPTS.TBSmearResult.NoResult.uuid) ? 'block' : 'none' }}
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
        formInstanceId={formInstanceId}
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

