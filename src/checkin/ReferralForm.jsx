import React from 'react';
import { connect } from "react-redux";
import { selectors } from '@openmrs/react-components';
import { Grid, Row, Col, FormGroup, ControlLabel } from "react-bootstrap";
import { Obs } from '@openmrs/react-components';
import ScreeningForm from '../screening/ScreeningForm';
import { CONCEPTS, ENCOUNTER_TYPES, FORM_ANSWERS } from "../constants";


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

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
  };
};

export default connect(mapStateToProps)(ReferralForm);
