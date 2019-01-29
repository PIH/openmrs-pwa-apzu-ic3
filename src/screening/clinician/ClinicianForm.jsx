import React from 'react';
import { connect } from 'react-redux';
import {formValueSelector, change, untouch} from 'redux-form';
import {Obs, formUtil, selectors} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from '../../constants';
import ScreeningForm from "../ScreeningForm";

class ClinicianForm extends React.PureComponent {

  componentDidUpdate(prevProps) {
    if (typeof this.props.clinicalOutcome !== 'undefined' && this.props.clinicalOutcome !== prevProps.clinicalOutcome) {
      if (this.props.clinicalOutcome === CONCEPTS.ClinicalFollowUp.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('transfer-to-another-facility', CONCEPTS.TransferToAnotherFacility.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('advanced-care', CONCEPTS.AdvancedCare.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('other-clinical-outcome', CONCEPTS.OtherClinicalOutcome.uuid)));
      }
      if (this.props.clinicalOutcome === CONCEPTS.TransferToAnotherFacility.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('clinical-follow-up', CONCEPTS.ClinicalFollowUp.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('advanced-care', CONCEPTS.AdvancedCare.uuid)));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('other-clinical-outcome', CONCEPTS.OtherClinicalOutcome.uuid)));
      }
      if (this.props.clinicalOutcome === CONCEPTS.AdvancedCare.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('clinical-follow-up', CONCEPTS.ClinicalFollowUp.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('transfer-to-another-facility', CONCEPTS.TransferToAnotherFacility.uuid)));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('other-clinical-outcome', CONCEPTS.OtherClinicalOutcome.uuid)));
      }
      if (this.props.clinicalOutcome === CONCEPTS.OtherClinicalOutcome.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('clinical-follow-up', CONCEPTS.ClinicalFollowUp.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('transfer-to-another-facility', CONCEPTS.TransferToAnotherFacility.uuid)));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('advanced-care', CONCEPTS.AdvancedCare.uuid)));
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
            Clinical Notes
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <FormGroup controlId="formClinicalNotes">
              <Obs
                concept={CONCEPTS.ClinicalNotes.uuid}
                path="clinical-notes"
                widget="textarea"
              />
            </FormGroup>
          </Col>
        </Row>
        <span>
          <Row>
            <Col componentClass={ControlLabel}>
              Clinical Outcome
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="formClinicalOutcome">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.ClinicalOutcome.uuid}
                  conceptAnswers={FORM_ANSWERS.clinicalOutcomes}
                  path="clinical-outcome"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>
        <span
          style={{ display: (typeof this.props.clinicalOutcome !== 'undefined') && (this.props.clinicalOutcome === CONCEPTS.ClinicalFollowUp.uuid) ? 'block' : 'none' }}>
          <Row>
            <Col componentClass={ControlLabel}>
              Next Appointment Date
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="formReasonForNoSample">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.ClinicalFollowUp.uuid}
                  datatype="date"
                  path="clinical-follow-up"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>
        <span
          style={{ display: (typeof this.props.clinicalOutcome !== 'undefined') && (this.props.clinicalOutcome === CONCEPTS.TransferToAnotherFacility.uuid) ? 'block' : 'none' }}>
          <Row>
            <Col componentClass={ControlLabel}>
              Transfer Facility
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="formReasonForNoSample">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.TransferToAnotherFacility.uuid}
                  path="transfer-to-another-facility"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>
        <span
          style={{ display: (typeof this.props.clinicalOutcome !== 'undefined') && (this.props.clinicalOutcome === CONCEPTS.AdvancedCare.uuid) ? 'block' : 'none' }}>
          <Row>
            <Col componentClass={ControlLabel}>
              Reason For Exit
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="formReasonForNoSample">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.AdvancedCare.uuid}
                  path="advanced-care"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>
        <span
          style={{ display: (typeof this.props.clinicalOutcome !== 'undefined') && (this.props.clinicalOutcome === CONCEPTS.OtherClinicalOutcome.uuid) ? 'block' : 'none' }}>
          <Row>
            <Col componentClass={ControlLabel}>
              Other Outcome
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="formReasonForNoSample">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.OtherClinicalOutcome.uuid}
                  path="other-clinical-outcome"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>
      </Grid>
    );

    return (
      <ScreeningForm
        backLink="/screening/vl/queue"
        encounterType={ENCOUNTER_TYPES.ClinicalPlan}
        formContent={formContent}
        formId="vl-form"
        formInstanceId={this.props.formInstanceId}
        toastMessage="Clinical Outcome Saved"
      />
    );

  }
}


export default connect((state, props) => {
  const selector = formValueSelector(props.formInstanceId);
  const clinicalOutcome = selector(state, formUtil.obsFieldName('clinical-outcome', CONCEPTS.ClinicalOutcome.uuid));
  return {
    patient: selectors.getSelectedPatientFromStore(state),
    clinicalOutcome,
  };
})(ClinicianForm);

