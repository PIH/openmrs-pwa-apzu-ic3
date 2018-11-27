import React from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel } from "react-bootstrap";
import { Obs } from '@openmrs/react-components';
import ScreeningForm from '../screening/ScreeningForm';
import {CONCEPTS, ENCOUNTER_TYPES, FORM_ANSWERS, VISIT_TYPES} from "../constants";


class ReferralForm extends React.Component {

  render() {

    let formContent = (
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
                placeholder="Select Source of Referral"
                path="referral"
                conceptAnswers={ FORM_ANSWERS.referrals }
              />
            </FormGroup>
          </Col>
        </Row>
      </Grid>
    );

    return (
      <ScreeningForm
        backLink={ this.props.backLink }
        encounterType={ ENCOUNTER_TYPES.CheckInEncounterType }
        formContent={formContent}
        formId="checkin-form"
        formInstanceId="checkin-form"
      />
    );
  }

}

export default ReferralForm;
