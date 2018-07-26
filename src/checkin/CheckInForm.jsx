import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import CompletedScreenings from "../screening/CompletedScreenings";
import { FieldInput } from '@openmrs/react-components';
import { Button, ButtonToolbar, Grid, Row, Col, Form, FormGroup, ControlLabel, Label } from 'react-bootstrap';

let CheckinForm = props => {

  const { handleSubmit, submitting, activeVisit } = props;

  return (
    <div>
      <Link to="/checkin/checkInQueue">
        <Button bsSize='large' bsStyle='danger'>
          Back to Queue
        </Button>
      </Link>
      <h3><Label>Check-in</Label></h3>
      <Form
        horizontal
        onSubmit={handleSubmit}
      >
        <Grid>

          <Row>
            <FormGroup controlId="formFirstName">
              <Col
                componentClass={ControlLabel}
                sm={2}
              >
                First Name
              </Col>
              <Col sm={4}>
                <Field
                  component={FieldInput}
                  name="name.givenName"
                  placeholder="First Name"
                  type='text'
                />
              </Col>
            </FormGroup>
          </Row>

          <Row>
            <FormGroup controlId="formLastName">
              <Col
                componentClass={ControlLabel}
                sm={2}
              >
                Last Name
              </Col>
              <Col sm={4}>
                <Field
                  component={FieldInput}
                  name="name.familyName"
                  placeholder="Last Name"
                  type='text'
                />
              </Col>
            </FormGroup>
          </Row>

          <Row>
            <FormGroup controlId="formGender">
              <Col
                componentClass={ControlLabel}
                sm={2}
              >
                Gender
              </Col>
              <Col sm={4}>
                <Field
                  component={FieldInput}
                  name="gender"
                  placeholder="Gender"
                  type='text'
                />
              </Col>
            </FormGroup>
          </Row>

          <Row>
            <FormGroup controlId="formAge">
              <Col
                componentClass={ControlLabel}
                sm={2}
              >
                Age
              </Col>
              <Col sm={4}>
                <Field
                  component={FieldInput}
                  name="age"
                  placeholder="Age"
                  type='number'
                />
              </Col>
            </FormGroup>
          </Row>


          { !(typeof activeVisit !== 'undefined' && typeof activeVisit.encounters !== 'undefined' ) &&
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

          { (typeof activeVisit !== 'undefined' && typeof activeVisit.encounters !== 'undefined' ) &&
            <div>
              <h3><Label>Completed Screenings</Label></h3>
              <CompletedScreenings patientUuid={ activeVisit.patient.uuid } />
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

CheckinForm = connect(
  state => ({
    initialValues: state.selectedPatient.patient.patient,
    activeVisit: state.selectedPatient.visit.activeVisit
  })
)(CheckinForm);

export default CheckinForm;

