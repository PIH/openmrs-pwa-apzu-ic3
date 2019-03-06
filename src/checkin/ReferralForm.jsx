import React from 'react';
import { connect } from "react-redux";
import { Grid, Row, Col, FormGroup, ControlLabel } from "react-bootstrap";
import { Obs, formUtil, selectors } from '@openmrs/react-components';
import ScreeningForm from '../screening/ScreeningForm';
import { CONCEPTS, ENCOUNTER_TYPES, FORM_ANSWERS } from "../constants";
import {formValueSelector} from "redux-form";


class ReferralForm extends React.Component {
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
                Referred From
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
          <span style={{ display: (typeof this.props.referralObs !== 'undefined') && (this.props.referralObs === CONCEPTS.SOURCE_OF_REFERRAL.Linkage_to_care.uuid) ? 'block' : 'none' }}>
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
      />
    );
  }

}

const mapStateToProps = (state, props) => {
  const selector = formValueSelector(props.formInstanceId);
  const referralObs = selector(state, formUtil.obsFieldName('referral', CONCEPTS.SOURCE_OF_REFERRAL.uuid));
  return {
    patient: selectors.getSelectedPatientFromStore(state),
    referralObs
  };
};

export default connect(mapStateToProps)(ReferralForm);
