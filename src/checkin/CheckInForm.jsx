import React from 'react';
import { reduxForm, Field } from 'redux-form';
import CompletedScreenings from "../screening/CompletedScreenings";
import { Button, ButtonToolbar, Grid, Row, Col, Form, FormGroup, ControlLabel, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CONCEPTS } from "../constants";
import '../assets/css/LoginPage.css';
import { colHeight, littlePaddingLeft, divContainer, rowStyles, historySection, centerTextAlign } from '../pwaStyles';


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
    <div style={ divContainer }>
      <Grid style={ divContainer }>
        <Row style={ rowStyles }>
          <Col sm={20} md={20} style={ littlePaddingLeft }>
            <span><h3>Patient Check-In</h3></span>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col sm={6} style={ historySection }>
            <span style={ centerTextAlign }><h1>Summary</h1></span>
            <Grid>
              <Row>
                <Col sm={20} md={20} style={ colHeight }>
                  <span><h1>{''}</h1></span>
                </Col>
              </Row>
              {(typeof patient !== 'undefined') && (patient !== null) &&
              <Row>
                <FormGroup controlId="formAddress">
                  <Col
                    componentClass={ControlLabel}
                    sm={2}
                  >
                    <u> Address:</u>
                  </Col>
                  <Col sm={ 4 }>
                    { patient.address.village }<br />
                    { patient.address.traditionalAuthority }<br />
                    { patient.address.district }<br />
                    <br />
                  </Col>

                </FormGroup>
              </Row>
              }
              {(typeof patient !== 'undefined') && (patient !== null) &&
              <Row>
                <FormGroup controlId="formPhoneNumber">
                  <Col componentClass={ControlLabel} sm={2}>
                    <u>Phone:</u>
                  </Col>
                  <Col sm={2}>
                    {patient.phoneNumber}<br /><br />
                  </Col>
                </FormGroup>
              </Row>
              }
              {(typeof patient !== 'undefined') && (patient !== null) &&
              <Row>
                <FormGroup controlId="formChw">
                  <Col componentClass={ControlLabel} sm={2}>
                    <u>CHW:</u>
                  </Col>
                  <Col sm={4}>
                    {patient.chw}<br /><br />
                  </Col>
                </FormGroup>
              </Row>
              }

            </Grid>
          </Col>
          <Col sm={6}>
            <span style={ centerTextAlign }><h1>Today</h1></span>
            <Form
              horizontal
              onSubmit={handleSubmit}
            >
              <Grid>
                <Row>
                  <Col sm={20} md={20} style={ colHeight }>
                    <span><h1>{''}</h1></span>
                  </Col>
                </Row>
                <Row>
                  <FormGroup controlId="formReferralSelect">
                    <Col componentClass={ControlLabel} sm={ 4 }>
                      Referred From:
                    </Col>
                    <Col sm={ 6 }>
                      <Field
                        name="referral"
                        id="referral"
                        options={referrals}
                        component={Select}
                        placeholder="Select Source of Referral"
                      />
                    </Col>
                  </FormGroup>
                </Row>
                <Row>
                  <Col sm={20} md={20} style={ colHeight }>
                    <span><h1>{''}</h1></span>
                  </Col>
                </Row>
                {!(patient && patient.visit && patient.visit.encounters) &&
                <Row>
                  <FormGroup controlId="formSubmit">
                    <Col sm={ 1 } smOffset={ 3 } >
                      <Link to={props.backLink}>
                        <Button>Cancel</Button>
                      </Link>
                    </Col>
                    <Col
                      sm={ 3 } smOffset={ 4 }
                    >
                      <ButtonToolbar>
                        <Button
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
          </Col>
        </Row>

      </Grid>

  </div>
 );
};


CheckinForm = reduxForm({
  form: 'checkInForm', // a unique identifier for this form
})(CheckinForm);


export default CheckinForm;

