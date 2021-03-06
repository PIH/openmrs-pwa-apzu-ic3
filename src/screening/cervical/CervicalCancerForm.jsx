import React from 'react';
import { connect } from 'react-redux';
import { Obs, ObsGroup, formUtil, selectors } from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS} from "../../constants";
import '../../assets/css/tabs.css';
import ScreeningForm from "../ScreeningForm";
import {change, formValueSelector, untouch} from "redux-form";

class CervicalCancerForm extends React.PureComponent {
  
  componentDidUpdate(prevProps) {
    const {
      cervicalScreenningResults,
      clinicalNotes,
      biopsyDone

    } = this.props;

    if (typeof cervicalScreenningResults.value !== 'undefined' && cervicalScreenningResults.value !== prevProps.cervicalScreenningResults.value) {
      if (cervicalScreenningResults.value !== CONCEPTS.Other.uuid) {
        this.clearField(clinicalNotes.fieldName);
      }
      if (cervicalScreenningResults.value === CONCEPTS.VIA_NEGATIVE.uuid) {
        this.clearField(biopsyDone.fieldName);
      }
    }
  }

  clearField(field) {
    this.props.dispatch(change(this.props.formInstanceId, field, null));
    this.props.dispatch(untouch(this.props.formInstanceId, field));
  }

  render() {

    const {
      cervicalScreenningResults
    } = this.props;

    const formContent = (
      <Grid>
        <ObsGroup
          groupingConcept={CONCEPTS.CERVICAL_CANCER_SCREENING_CONSTRUCT}
          path="cervical-cancer-screening-construct"
        >
          <Row>
            <Col componentClass={ControlLabel}>
              Screening Results
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <FormGroup controlId="formCervicalCancer">
                <Obs
                  concept={CONCEPTS.CERVICAL_CANCER_SCREENING_RESULTS.uuid}
                  conceptAnswers={FORM_ANSWERS.cervicalCancerResultAnswers}
                  path="cervical-cancer-results"
                  required={ true }
                />
              </FormGroup>
            </Col>
          </Row>

          <span
            style={{display: (typeof cervicalScreenningResults.value !== 'undefined') && (cervicalScreenningResults.value === CONCEPTS.Other.uuid) ? 'block' : 'none'}}
          >
          <Row>
            <Col
              componentClass={ControlLabel}
            >
              Clinical Notes
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <FormGroup controlId="">
                <Obs
                  concept={CONCEPTS.Clinical.ClinicalNotes}
                  path="clinical-notes"
                  widget="textarea"
                />
              </FormGroup>
            </Col>
          </Row>

          </span>

          <span
            style={{display: (typeof cervicalScreenningResults.value !== 'undefined') && (cervicalScreenningResults.value !== CONCEPTS.VIA_NEGATIVE.uuid) ? 'block' : 'none'}}
          >

        <Row>
          <Col
            componentClass={ControlLabel}
          >
            Biopsy Done?
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <FormGroup controlId="formBiopsy">
              <Obs
                concept={CONCEPTS.BIOPSY_DONE.uuid}
                conceptAnswers={FORM_ANSWERS.trueFalse}
                path="cervical-cancer-biopsy"
                required={ (typeof cervicalScreenningResults.value !== 'undefined') && (cervicalScreenningResults.value !== CONCEPTS.VIA_NEGATIVE.uuid) ? true : false }
              />
            </FormGroup>
          </Col>
        </Row>
        </span>

        </ObsGroup>
      </Grid>
    );

    return (
      <ScreeningForm
        backLink={ this.props.backLink }
        encounterType={ENCOUNTER_TYPES.CervicalCancerScreeningEncounterType}
        formContent={formContent}
        formId="cervical-cancer-form"
        formInstanceId={ this.props.formInstanceId }
        toastMessage="Cervical Cancer Saved"
      />
    );
  }
};

export default connect((state, props) => {
  const selector = formValueSelector(props.formInstanceId);

  const cervicalScreenningResultsFieldName = formUtil.obsFieldName(['cervical-cancer-screening-construct', 'cervical-cancer-results'], [CONCEPTS.CERVICAL_CANCER_SCREENING_CONSTRUCT.uuid, CONCEPTS.CERVICAL_CANCER_SCREENING_RESULTS.uuid]);
  const clinicalNotesFieldName = formUtil.obsFieldName(['cervical-cancer-screening-construct', 'clinical-notes'], [CONCEPTS.CERVICAL_CANCER_SCREENING_CONSTRUCT.uuid, CONCEPTS.Clinical.ClinicalNotes.uuid]);
  const biopsyDone = formUtil.obsFieldName(['cervical-cancer-screening-construct', 'cervical-cancer-biopsy'], [CONCEPTS.CERVICAL_CANCER_SCREENING_CONSTRUCT.uuid, CONCEPTS.BIOPSY_DONE.uuid]);

  return {
    cervicalScreenningResults: {
      fieldName: cervicalScreenningResultsFieldName,
      value: selector(state, cervicalScreenningResultsFieldName)
    },
    clinicalNotes: {
      fieldName: clinicalNotesFieldName,
      value: selector(state, clinicalNotesFieldName)
    },
    biopsyDone: {
      fieldName: biopsyDone,
      value: selector(state, biopsyDone)
    },
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(CervicalCancerForm);

