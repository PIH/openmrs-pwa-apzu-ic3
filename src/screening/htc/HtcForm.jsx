import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Alert, Button, ButtonToolbar, ToggleButtonGroup, ToggleButton, Grid, Row, Col, Form, FormGroup, ControlLabel, Label } from 'react-bootstrap';
import { CONCEPTS } from '../../constants';


let HtcForm = props => {

  const { handleSubmit, submitting } = props;

  const answers = [
    { uuid: CONCEPTS.HTC_RESULTS.Reactive.uuid, name: CONCEPTS.HTC_RESULTS.Reactive.name },
    { uuid: CONCEPTS.HTC_RESULTS.Non_Reactive.uuid, name: CONCEPTS.HTC_RESULTS.Non_Reactive.name },
    { uuid: CONCEPTS.HTC_RESULTS.Not_Done.uuid, name: CONCEPTS.HTC_RESULTS.Not_Done.name },
  ];


  const renderToggleButtonGroup = ({ input, options }) => (

    <ToggleButtonGroup type="radio" name="resultsToggleGroup" justified={true} {...input}>
      { options.map( option =>
        <ToggleButton key={ option.uuid } value={option.uuid}>{ option.name }</ToggleButton>
      )}
    </ToggleButtonGroup>

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

          { (typeof props.initialValues !== 'undefined') &&
          (typeof props.initialValues.alert !== 'undefined') &&
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
                  { props.initialValues.alert }
                </Alert>
              </Col>
            </FormGroup>
          </Row>
          }

          { (typeof props.initialValues !== 'undefined') &&
          (typeof props.initialValues.actions !== 'undefined') && (props.initialValues.actions !== props.initialValues.alert) &&
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
                  { props.initialValues.actions }
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
                  component={ renderToggleButtonGroup }
                  id="htcResults"
                  name="htcResults"
                  options={ answers }
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
                    disabled={ submitting }
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

export default connect(state => {
  return {
    initialValues: state.selectedPatient,
  };
})(HtcForm);
