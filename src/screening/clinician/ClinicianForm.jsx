import React from 'react';
import { connect } from 'react-redux';
import { change, formValueSelector, untouch } from 'redux-form';
import { Obs, selectors, formUtil } from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from '../../constants';
import ScreeningForm from "../ScreeningForm";
import '../../../src/assets/css/ClinicianForm.css';

class ClinicianForm extends React.Component {
  componentDidUpdate(prevProps) {
    const { dispatch, clinicalOutcome, 
      clinicalQualitativeTimeField, 
      clinicalReasonToStopCareField, 
      clinicalOtherOutcomeField, 
      clinicalNextAppointmentDateField,
      clinicalTransferToAnotherFacilityField  } = this.props;

    if (clinicalOutcome === CONCEPTS.Clinical.TransferToAnotherFacility.uuid) {
      dispatch(change(this.props.formInstanceId, clinicalQualitativeTimeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalQualitativeTimeField));

      dispatch(change(this.props.formInstanceId, clinicalNextAppointmentDateField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalNextAppointmentDateField));

      dispatch(change(this.props.formInstanceId, clinicalQualitativeTimeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalQualitativeTimeField));

      dispatch(change(this.props.formInstanceId, clinicalReasonToStopCareField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalReasonToStopCareField));

      dispatch(change(this.props.formInstanceId, clinicalOtherOutcomeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalOtherOutcomeField));
    } else if (clinicalOutcome === CONCEPTS.Clinical.ExitFromCare.uuid) {
      dispatch(change(this.props.formInstanceId, clinicalQualitativeTimeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalQualitativeTimeField));

      dispatch(change(this.props.formInstanceId, clinicalNextAppointmentDateField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalNextAppointmentDateField));

      dispatch(change(this.props.formInstanceId, clinicalQualitativeTimeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalQualitativeTimeField));

      dispatch(change(this.props.formInstanceId, clinicalTransferToAnotherFacilityField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalTransferToAnotherFacilityField));

      dispatch(change(this.props.formInstanceId, clinicalOtherOutcomeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalOtherOutcomeField)); 
    } else if (clinicalOutcome === CONCEPTS.Clinical.Other.uuid) {
      dispatch(change(this.props.formInstanceId, clinicalQualitativeTimeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalQualitativeTimeField));

      dispatch(change(this.props.formInstanceId, clinicalNextAppointmentDateField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalNextAppointmentDateField));

      dispatch(change(this.props.formInstanceId, clinicalQualitativeTimeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalQualitativeTimeField));

      dispatch(change(this.props.formInstanceId, clinicalTransferToAnotherFacilityField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalTransferToAnotherFacilityField));

      dispatch(change(this.props.formInstanceId, clinicalReasonToStopCareField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalReasonToStopCareField)); 
    } else if (clinicalOutcome === CONCEPTS.Clinical.FollowUp.uuid) {
      dispatch(change(this.props.formInstanceId, clinicalOtherOutcomeField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalOtherOutcomeField));

      dispatch(change(this.props.formInstanceId, clinicalTransferToAnotherFacilityField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalTransferToAnotherFacilityField));

      dispatch(change(this.props.formInstanceId, clinicalReasonToStopCareField, null));
      dispatch(untouch(this.props.formInstanceId, clinicalReasonToStopCareField)); 
    }
  }

  render() {
    const { clinicalOutcome } = this.props;
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
              Appointment time
            </Col>
          </Row>
          <div style={{ display: 'flex' }}>
            <Obs
              concept={CONCEPTS.Clinical.NextAppointmentDate.uuid}
              datatype="date"
              defaultDate={undefined}
              path="clinical-next-appointment-date"
              usePortalMode
            />
            <span style={{ marginLeft: '20px', marginTop: '1px' }}>
              <Obs
                concept={CONCEPTS.Clinical.QualitativeTime.uuid}
                conceptAnswers={FORM_ANSWERS.clinicalQualitativeTime}
                path="clinical-qualitative-time"
              />
            </span>
          </div>
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
        backLink={this.props.backLink}
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
  const clinicalReasonToStopCareField = formUtil.obsFieldName('clinical-reason-to-stop-care', CONCEPTS.Clinical.ReasonToStopCare.uuid);
  const clinicalOtherOutcomeField = formUtil.obsFieldName('clinical-other-outcome', CONCEPTS.Clinical.OtherOutcome.uuid);
  const clinicalTransferToAnotherFacilityField = formUtil.obsFieldName('clinical-transfer-to-another-facility', CONCEPTS.Clinical.TransferFacility.uuid);
  const clinicalNextAppointmentDateField = formUtil.obsFieldName('clinical-next-appointment-date', CONCEPTS.Clinical.NextAppointmentDate.uuid);

  const clinicalOutcome = selector(state, clinicalOutcomeField);
  const clinicalNextAppointmentDate = selector(state, clinicalNextAppointmentDateField);

  return {
    clinicalOutcome,
    clinicalQualitativeTimeField,
    clinicalReasonToStopCareField,
    clinicalOtherOutcomeField,
    clinicalTransferToAnotherFacilityField,
    clinicalNextAppointmentDate,
    patient: selectors.getSelectedPatientFromStore(state),
  };
})(ClinicianForm);
