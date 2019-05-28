import React from 'react';
import { connect } from "react-redux";
import { Grid, Row, Col, FormGroup, ControlLabel } from "react-bootstrap";
import { Obs, formUtil, selectors } from '@openmrs/react-components';
import ScreeningForm from '../screening/ScreeningForm';
import { CONCEPTS, ENCOUNTER_TYPES, FORM_ANSWERS } from "../constants";
import {change, formValueSelector, untouch} from "redux-form";


class ReferralForm extends React.Component {


  clearField(field) {
    this.props.dispatch(change(this.props.formInstanceId, field, null));
    this.props.dispatch(untouch(this.props.formInstanceId, field));
  }

  hasChanged(field, props, prevProps) {
    return typeof props[field].value !== 'undefined' && typeof prevProps[field].value !== 'undefined'
      && this.props[field].value !== prevProps[field].value;
  }

  componentDidUpdate(prevProps) {
    if (this.hasChanged('referral', this.props, prevProps)) {
      if (this.props.referral.value !== CONCEPTS.SOURCE_OF_REFERRAL.SHARC.uuid || this.props.referral.value !== CONCEPTS.SOURCE_OF_REFERRAL.Inpatient.uuid) {
        this.clearField(this.props.linkageToCare.fieldName);
      }
    }
  }

  render() {
    const { patient } = this.props;
    let formContent = null;

    if (patient.deceased) {
      formContent = (<Row>
        <Col xsOffset={3} xs={6}>
          <h3>Patient is deceased</h3>
        </Col>
      </Row>);

    } else {
      formContent = (
        <Grid>
          <Row>
            <Col componentClass={ControlLabel}>
              Why is patient here?
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <FormGroup controlId="formReferredFrom">
                <Obs
                  concept={CONCEPTS.SOURCE_OF_REFERRAL.uuid}
                  conceptAnswers={FORM_ANSWERS.referrals}
                  path="referral"
                  placeholder="Select Source of Referral"
                />
              </FormGroup>
            </Col>
          </Row>
          <span
            style={{ display: (typeof this.props.referral.value !== 'undefined') && (this.props.referral.value === CONCEPTS.SOURCE_OF_REFERRAL.SHARC.uuid || this.props.referral.value === CONCEPTS.SOURCE_OF_REFERRAL.Inpatient.uuid) ? 'block' : 'none' }}>
            <Row>
              <Col componentClass={ControlLabel}>
                {CONCEPTS.SOURCE_OF_REFERRAL.Linkage_to_care_ID.display}
              </Col>
            </Row>
            <Row>
              <Col sm={8}>
                <FormGroup controlId="formLinkageToCareId">
                  <Obs
                    concept={CONCEPTS.SOURCE_OF_REFERRAL.Linkage_to_care_ID.uuid}
                    datatype="text"
                    path="linkage-to-care-id"
                    placeholder="Enter Linkage to Care ID"
                  />
                </FormGroup>
              </Col>
            </Row>
          </span>
        </Grid>
      );
    }

    return (
      <ScreeningForm
        backLink={this.props.backLink}
        encounterType={ENCOUNTER_TYPES.CheckInEncounterType}
        formContent={formContent}
        formId="checkin-form"
        formInstanceId={this.props.formInstanceId}
        hideSubmitActionButtons={patient.deceased}
      />
    );
  }

}

const mapStateToProps = (state, props) => {
  const selector = formValueSelector(props.formInstanceId);

  const referralField = formUtil.obsFieldName('referral', CONCEPTS.SOURCE_OF_REFERRAL.uuid);
  const linkageToCareField = formUtil.obsFieldName('linkage-to-care-id', CONCEPTS.SOURCE_OF_REFERRAL.Linkage_to_care_ID.uuid);

  return {
    patient: selectors.getSelectedPatientFromStore(state),

    referral: {
      fieldName: referralField,
      value: selector(state, referralField)
    },
    linkageToCare: {
      fieldName: linkageToCareField,
      value: selector(state, linkageToCareField)
    }
  };
};

export default connect(mapStateToProps)(ReferralForm);
