import React from 'react';
import { reduxForm, Field } from 'redux-form';
import CompletedScreenings from "../screening/CompletedScreenings";
import { Section } from '@openmrs/react-components';
import { Badge, Button, ButtonToolbar, Grid, Row, Col, Form, FormGroup, ControlLabel, Label } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { CONCEPTS } from "../constants";
import '../assets/css/LoginPage.css';


const rowStyles = {
  backgroundColor: '#ffa500b3'
};

const littlePaddingLeft = {
  paddingLeft: '20px'
};

const divContainer = {
  paddingLeft: '0px',
  paddingRight: '0px'
};

const colHeight = {
  height: '40px'
};

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
            <span><h2>Patient Check-In</h2></span>
          </Col>
        </Row>
        <Row>
          <Col sm={20} md={20} style={ colHeight }>
            <span><h1>{''}</h1></span>
          </Col>
        </Row>
      </Grid>
    <Grid>
    <Section title="Patient Demographics"></Section>
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
          {(typeof patient !== 'undefined') && (patient !== null) &&
          <Row>
            <FormGroup controlId="formAddress">
            <Col
              componentClass={ControlLabel}
              sm={2}
            >
              Address
            </Col>
            <Col sm={ 2 }>
              <Badge><h5>{ patient.address.village }</h5></Badge>&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon="edit" /><br />
                { patient.address.traditionalAuthority }<br />
                { patient.address.district }<br />

            </Col>

          </FormGroup>
        </Row>
        }
          {(typeof patient !== 'undefined') && (patient !== null) &&
          <Row>
            <FormGroup controlId="formPhoneNumber">
              <Col componentClass={ControlLabel} sm={2}>
                Phone
              </Col>

              <Col sm={2}>
                {patient.phoneNumber}&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon="edit"/>
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
              {patient.chw}&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon="edit" />
            </Col>
          </FormGroup>
        </Row>
        }
        <Row>
          <FormGroup controlId="formReferralSelect">
            <Col componentClass={ControlLabel} sm={2}>
              Referred From
            </Col>
            <Col sm={ 3 }>
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

        {!(patient && patient.visit && patient.visit.encounters) &&
        <Row>
          <FormGroup controlId="formSubmit">
            <Col sm={2} >
              <Link to={props.backLink}>
                <Button bsSize="medium">Cancel</Button>
              </Link>
            </Col>
            <Col
              sm={2}

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
    </Grid>
  </div>
 );
};


CheckinForm = reduxForm({
  form: 'checkInForm', // a unique identifier for this form
})(CheckinForm);


export default CheckinForm;

