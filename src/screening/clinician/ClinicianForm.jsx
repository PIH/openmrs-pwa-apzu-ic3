import React from 'react';
import { connect } from 'react-redux';
import { change, formValueSelector, untouch } from 'redux-form';
import { Obs, selectors, formUtil } from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from '../../constants';
import ScreeningForm from "../ScreeningForm";

class ClinicianForm extends React.Component {
  componentDidUpdate(prevProps) {
    const { dispatch, clinicalOutcome, 
      clinicalQualitativeTimeField, 
      clinicalReasonToStopCareField, 
      clinicalFollowUpField, 
      clinicalOtherOutcomeField, 
      clinicalTransferToAnotherFacilityField  } = this.props;

    if (clinicalOutcome === CONCEPTS.Clinical.TransferToAnotherFacility.uuid) {
      dispatch(change(this.props.formInstanceId, clinicalQualitativeTimeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalQualitativeTimeField));

      dispatch(change(this.props.formInstanceId, clinicalFollowUpField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalFollowUpField));

      dispatch(change(this.props.formInstanceId, clinicalQualitativeTimeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalQualitativeTimeField));

      dispatch(change(this.props.formInstanceId, clinicalReasonToStopCareField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalReasonToStopCareField));

      dispatch(change(this.props.formInstanceId, clinicalOtherOutcomeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalOtherOutcomeField));
    } else if (clinicalOutcome === CONCEPTS.Clinical.ExitFromCare.uuid) {
      dispatch(change(this.props.formInstanceId, clinicalQualitativeTimeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalQualitativeTimeField));

      dispatch(change(this.props.formInstanceId, clinicalFollowUpField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalFollowUpField));

      dispatch(change(this.props.formInstanceId, clinicalQualitativeTimeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalQualitativeTimeField));

      dispatch(change(this.props.formInstanceId, clinicalTransferToAnotherFacilityField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalTransferToAnotherFacilityField));

      dispatch(change(this.props.formInstanceId, clinicalOtherOutcomeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalOtherOutcomeField)); 
    } else if (clinicalOutcome === CONCEPTS.Clinical.Other.uuid) {
      dispatch(change(this.props.formInstanceId, clinicalQualitativeTimeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalQualitativeTimeField));

      dispatch(change(this.props.formInstanceId, clinicalFollowUpField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalFollowUpField));

      dispatch(change(this.props.formInstanceId, clinicalQualitativeTimeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalQualitativeTimeField));

      dispatch(change(this.props.formInstanceId, clinicalTransferToAnotherFacilityField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalTransferToAnotherFacilityField));

      dispatch(change(this.props.formInstanceId, clinicalReasonToStopCareField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalReasonToStopCareField)); 
    } else if (clinicalOutcome === CONCEPTS.Clinical.FollowUp.uuid) {
      dispatch(change(this.props.formInstanceId, clinicalOtherOutcomeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalOtherOutcomeField));

      dispatch(change(this.props.formInstanceId, clinicalQualitativeTimeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalQualitativeTimeField));

      dispatch(change(this.props.formInstanceId, clinicalTransferToAnotherFacilityField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalTransferToAnotherFacilityField));

      dispatch(change(this.props.formInstanceId, clinicalReasonToStopCareField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalReasonToStopCareField)); 
    }
  }

  render() {
    const { clinicalOutcome, clinicalFollowUp } = this.props;
    const formContent = (
      <Grid>
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

        <Row>
          <Col componentClass={ControlLabel}>
          Clinical Outcome
          </Col>
        </Row>
        <Row>
          <FormGroup controlId="">
            <Col sm={12}>
              <Obs
                concept={CONCEPTS.Clinical.Outcome.uuid}
                conceptAnswers={FORM_ANSWERS.clinicalOutcome}
                path="clinical-outcome"
              />
            </Col>
          </FormGroup>
        </Row>

        {(typeof clinicalOutcome !== 'undefined' && clinicalOutcome === CONCEPTS.Clinical.FollowUp.uuid) && <span>
          <Row>
            <Col componentClass={ControlLabel}>
          Clinic Follow up
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.Clinical.FollowUp.uuid}
                  conceptAnswers={FORM_ANSWERS.clinicalFollowUp}
                  path="clinical-follow-up"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>}
        
        {(typeof clinicalFollowUp !== 'undefined' && clinicalFollowUp === CONCEPTS.Clinical.QualitativeTime.uuid) && <span>
          <Row>
            <Col componentClass={ControlLabel}>
            AM/PM Qualitative time
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.Clinical.QualitativeTime.uuid}
                  conceptAnswers={FORM_ANSWERS.clinicalQualitativeTime}
                  path="clinical-qualitative-time"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>}

        {(typeof clinicalOutcome !== 'undefined' && clinicalOutcome === CONCEPTS.Clinical.TransferToAnotherFacility.uuid) && <span>
          <Row>
            <Col componentClass={ControlLabel}>
            Transfer Facility (Transfer out to location)
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.Clinical.TransferFacility}
                  path="clinical-transfer-to-another-facility"
                  widget="textarea"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>}

        {(typeof clinicalOutcome !== 'undefined' && clinicalOutcome === CONCEPTS.Clinical.ExitFromCare.uuid) && <span>
          <Row>
            <Col componentClass={ControlLabel}>
            Reason to stop care
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.Clinical.ReasonToStopCare}
                  path="clinical-reason-to-stop-care"
                  widget="textarea"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>}

        {(typeof clinicalOutcome !== 'undefined' && clinicalOutcome === CONCEPTS.Clinical.Other.uuid) && <span>
          <Row>
            <Col componentClass={ControlLabel}>
            Other outcome
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.Clinical.OtherOutcome}
                  path="clinical-other-outcome"
                  widget="textarea"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>}
      </Grid>
    );

    return (
      <ScreeningForm
        backLink="/screening/clinician/queue"
        encounterType={ENCOUNTER_TYPES.ClinicalPlan}
        formContent={formContent}
        formId="clinician-form"
        formInstanceId={this.props.formInstanceId}
        toastMessage="Clinical Notes Saved"
      />
    );
  }
};


export default connect((state, props) => {
  const selector = formValueSelector(props.formInstanceId);
  const clinicalOutcomeField = formUtil.obsFieldName('clinical-outcome', CONCEPTS.Clinical.Outcome.uuid);
  const clinicalQualitativeTimeField = formUtil.obsFieldName('clinical-qualitative-time', CONCEPTS.Clinical.QualitativeTime.uuid);
  const clinicalFollowUpField = formUtil.obsFieldName('clinical-follow-up', CONCEPTS.Clinical.FollowUp.uuid);
  const clinicalReasonToStopCareField = formUtil.obsFieldName('clinical-reason-to-stop-care', CONCEPTS.Clinical.ReasonToStopCare.uuid);
  const clinicalOtherOutcomeField = formUtil.obsFieldName('clinical-other-outcome', CONCEPTS.Clinical.OtherOutcome.uuid);
  const clinicalTransferToAnotherFacilityField = formUtil.obsFieldName('clinical-transfer-to-another-facility', CONCEPTS.Clinical.TransferFacility.uuid);

  const clinicalOutcome = selector(state, clinicalOutcomeField);
  const clinicalFollowUp = selector(state, clinicalFollowUpField);


  return {
    clinicalOutcome,
    clinicalFollowUp,
    clinicalQualitativeTimeField,
    clinicalFollowUpField,
    clinicalReasonToStopCareField,
    clinicalOtherOutcomeField,
    clinicalTransferToAnotherFacilityField,
    patient: selectors.getSelectedPatientFromStore(state),
  };
})(ClinicianForm);
