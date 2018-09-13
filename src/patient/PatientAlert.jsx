import React from 'react';
import { connect } from 'react-redux';
import { Alert, Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';


let PatientAlert = (props) => {

  return (
    <div>
      <Grid>
        { (typeof props.patient !== 'undefined') &&
        (typeof props.patient.alert !== 'undefined') &&
        <Row>
          <FormGroup controlId="formAlert">
            <Col sm={4}>
              <ControlLabel>Alert</ControlLabel>
              <Alert bsStyle="danger">
                { props.patient.alert }
              </Alert>
            </Col>
            {(typeof props.patient !== 'undefined') &&
            (typeof props.patient.actions !== 'undefined') && (props.patient.actions !== props.patient.alert) &&
            <Col sm={4}>
              <ControlLabel>Action</ControlLabel>
              <Alert bsStyle="warning">
                { props.patient.actions }
              </Alert>
            </Col>
            }
          </FormGroup>
        </Row>
        }
      </Grid>
    </div>
  );
};

export default connect(state => {
  return {
    patient: state.selectedPatient ? state.patients[state.selectedPatient] : null
  };
})(PatientAlert);

