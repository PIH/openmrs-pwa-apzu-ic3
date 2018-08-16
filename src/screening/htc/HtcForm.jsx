import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { SelectList } from 'react-widgets';
import { Link } from 'react-router-dom';
import { Alert, Button, ButtonToolbar, Grid, Row, Col, Form, FormGroup, ControlLabel, Label } from 'react-bootstrap';

let HtcForm = props => {

  const { handleSubmit, submitting, patient } = props;

  const renderSelectList = ({ input, data }) => (
    <SelectList
      {...input}
      data={data}
      onBlur={() => input.onBlur()}
    />
  );

  return (
    <div>
      <Link to="/screening/htc/queue">
        <Button
          bsSize='large'
          bsStyle='danger'
        >
          Back to HTC Queue
        </Button>
      </Link>
      <h3><Label>HTC Station</Label></h3>
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
            <FormGroup controlId="formHtcResults">
              <Col
                componentClass={ControlLabel}
                sm={2}
              >
                Results
              </Col>
              <Col sm={8}>
                <Field
                  component={renderSelectList}
                  data={['Reactive', 'Non-Reactive', 'Not performed today']}
                  id="htcResults"
                  name="htcResults"
                />
              </Col>
            </FormGroup>
          </Row>


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
                    Save
                  </Button>

                </ButtonToolbar>
              </Col>
            </FormGroup>
          </Row>



        </Grid>
      </Form>
    </div>
  );
};


HtcForm = reduxForm({
  form: 'htc-form', // a unique identifier for this form
})(HtcForm);

const selector = formValueSelector('htc-form');

export default connect(state => {
  return {
    htcResults: selector(state, 'htcResults'),
    initialValues: state.selectedPatient,
  };
})(HtcForm);
