import React from 'react';
import {reduxForm, Field} from 'redux-form';
import CompletedScreenings from "../screening/CompletedScreenings";
import { Alert, Button, ButtonToolbar, Grid, Row, Col, Form, FormGroup, ControlLabel, Label } from 'react-bootstrap';
import { goBack } from 'connected-react-router';
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
      <select {...input} disabled={disabled} class="referralSelector">
        <option key={0} value={''}>{placeholder}</option>
        { options.map(option =>
          <option key={option.uuid} value={option.uuid}>
            {option.name}
          </option>
        )}
      </select>

    </div>
  );

  const historyBack = () => {
    props.dispatch(goBack());
  };

  return (
    <div>
      <Button bsSize='large' bsStyle='danger' onClick={historyBack.bind(this)}>
        Back
      </Button>
      <h3><Label>Check-in</Label></h3>
      <Form
        horizontal
        onSubmit={handleSubmit}
      >
        <Grid>

          { (typeof patient !== 'undefined') && (patient !== null) &&
            (typeof patient.alert !== 'undefined') && (patient.alert !== null) && (patient.alert.length > 0) &&
            <Row>
              <FormGroup controlId="formAlert">
                <Col
                  componentClass={ControlLabel}
                  sm={2}
                >
              Alert
                </Col>
                <Col
                  sm={4}
                >
                  <Alert bsStyle="danger">
                    { patient.alert }
                  </Alert>
                </Col>
              </FormGroup>
            </Row>
          }

          { (typeof patient !== 'undefined') && (patient !== null) &&
            (typeof patient.actions !== 'undefined')  && (patient.actions !== null) && (patient.actions !== patient.alert) &&
          <Row>
            <FormGroup controlId="formAction">
              <Col
                componentClass={ControlLabel}
                sm={2}
              >
              Action
              </Col>
              <Col sm={4}>
                <Alert bsStyle="warning">
                  { patient.actions }
                </Alert>
              </Col>
            </FormGroup>
          </Row>
          }

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
                    { patient.village }
                  </Alert>
                </Col>

            </FormGroup>
          </Row>

          <Row>
            <FormGroup controlId="formChw">
              <Col componentClass={ControlLabel} sm={2}>
                CHW
              </Col>
              <Col sm={4}>
                <Alert bsStyle="info">
                  { patient.chw }
                </Alert>
              </Col>
            </FormGroup>
          </Row>

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
              <Col
                sm={4}
                smOffset={2}
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

