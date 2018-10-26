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
          <FormGroup controlId="formReferredFrom">
            <Col componentClass={ControlLabel} sm={4}>
              Referred From:
            </Col>
            <Col sm={6}>
              <Obs
                concept={CONCEPTS.SOURCE_OF_REFERRAL.uuid}
                placeholder="Select Source of Referral"
                path="referral"
                conceptAnswers={ FORM_ANSWERS.referrals }
                widget="dropdown"
              />
            </Col>

          </FormGroup>
        </Row>


      </Grid>
    );

    return (
      <ScreeningForm
        backLink={ this.props.backLink }
        encounterType={ ENCOUNTER_TYPES.CheckInEncounterType }
        visitType={ VISIT_TYPES.ClinicVisitType }
        formContent={formContent}
        formId="checkin-form"
        formInstanceId="checkin-form"

      />
    );
  }

}

export default ReferralForm;
