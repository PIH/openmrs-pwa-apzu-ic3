import React from 'react';
import {reduxForm, Field} from 'redux-form';
import CompletedScreenings from "../screening/CompletedScreenings";
import PatientAlert from "../patient/PatientAlert";
import PatientAppointments from "../patient/PatientAppointments";
import PatientLabTests from "../patient/PatientLabTests";
import { Alert, Button, ButtonToolbar, Grid, Row, Col, Form, FormGroup, ControlLabel, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CONCEPTS } from "../constants";
import '../assets/css/LoginPage.css';

let CheckinForm = props => {

  const { handleSubmit, submitting, patient } = props;

  const referrals = [
    CONCEPTS.SOURCE_OF_REFERRAL.SHARC,
    CONCEPTS.SOURCE_OF_REFERRAL.OPD_at_health_center,
    CONCEPTS.SOURCE_OF_REFERRAL.Inpatient,
    CONCEPTS.SOURCE_OF_REFERRAL.Outside_Neno_District,
    CONCEPTS.SOURCE_OF_REFERRAL.Other
  ];

  const Select = ({ input, options, disabled, placeholder }) => (
    <div>
      <select {...input} disabled={disabled} className="referralSelector">
        <option key={0} value={''}>{placeholder}</option>
        { options.map(option =>
          <option key={option.uuid} value={option.uuid}>
            {option.name}
          </option>
        )}
      </select>

    </div>
  );

  return (
    <div>

      <h3><Label>Check-in</Label></h3>
      <Form
        horizontal
        onSubmit={handleSubmit}
      >
        <Grid>
          <PatientAppointments/>
          <PatientLabTests/>
          <PatientAlert/>
          {(typeof patient !== 'undefined') && (patient !== null) &&
          <Row>
            <FormGroup controlId="formVillage">

              <Col
                componentClass={ControlLabel}
                sm={2}
              >
                Village
              </Col>
              <Col sm={4}>
                <Alert bsStyle="info">
                  {patient.village}
                </Alert>
              </Col>

            </FormGroup>
          </Row>
          }
          {(typeof patient !== 'undefined') && (patient !== null) &&
          <Row>
            <FormGroup controlId="formChw">
              <Col componentClass={ControlLabel} sm={2}>
                CHW
              </Col>
              <Col sm={4}>
                <Alert bsStyle="info">
                  {patient.chw}
                </Alert>
              </Col>
            </FormGroup>
          </Row>
          }
          <Row>
            <FormGroup controlId="formReferralSelect">
              <Col componentClass={ControlLabel} sm={2}>
                Referred From
              </Col>
              <Col sm={4}>
                <Field
                  name="referral"
                  id="referral"
                  options={ referrals }
                  component={ Select }
                  placeholder="Select Source of Referral"
                />
              </Col>
            </FormGroup>
          </Row>

          {!(patient && patient.visit && patient.visit.encounters) &&
          <Row>
            <FormGroup controlId="formSubmit">
              <Col sm={2} xsOffset={2}>
                <Link to={ props.backLink }>
                  <Button bsSize="large">Cancel</Button>
                </Link>
              </Col>
              <Col
                sm={2}
                smOffset={1}
              >
                <ButtonToolbar>
                  <Button
                    bsSize="large"
                    bsStyle="success"
                    disabled={submitting}
                    type="submit"
                  >
                    Check-in
                  </Button>

                </ButtonToolbar>
              </Col>
            </FormGroup>
          </Row>
          }

          {(patient && patient.visit && patient.visit.encounters) &&
            <div>
              <h3><Label>Completed Screenings</Label></h3>
              <CompletedScreenings/>
            </div>
          }
        </Grid>
      </Form>
    </div>
  );
};


CheckinForm = reduxForm({
  form: 'checkInForm', // a unique identifier for this form
})(CheckinForm);


export default CheckinForm;

