import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import CompletedScreenings from "../screening/CompletedScreenings";
import { FieldInput } from '@openmrs/react-components';
import { Alert, Button, ButtonToolbar, Grid, Row, Col, Form, FormGroup, ControlLabel, Label } from 'react-bootstrap';
import { goBack } from 'connected-react-router';


let CheckinForm = props => {

  const { handleSubmit, submitting, patient } = props;

  const historyBack = () => {
    props.dispatch(goBack());
  }

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

          { (typeof patient !== 'undefined') &&
            (typeof patient.alert !== 'undefined') &&
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

          { (typeof patient !== 'undefined') &&
            (typeof patient.actions !== 'undefined') && (patient.actions !== patient.alert) &&
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

CheckinForm = connect(
  state => ({
    patient: state.selectedPatient ? state.patients[state.selectedPatient] : null,
  })
)(CheckinForm);

export default CheckinForm;

