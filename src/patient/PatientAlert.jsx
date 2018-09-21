import React from 'react';
import { connect } from 'react-redux';
import { Alert, Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';


let PatientAlert = (props) => {

  return (
    <div>
      <Grid>
        { (typeof props.patient !== 'undefined') && props.patient !== null &&
        (typeof props.patient.alert !== 'undefined') && props.patient.alert !== null &&
        <Row>
          <FormGroup controlId="formAlert">
            <Col sm={4}>
              <ControlLabel>Alert</ControlLabel>
              <Alert bsStyle="danger">
                { props.patient.alert }
              </Alert>
            </Col>
            {(typeof props.patient !== 'undefined') && props.patient !== null &&
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
    patient: state.openmrs.selectedPatient ? state.openmrs.patients[state.openmrs.selectedPatient] : null
  };
})(PatientAlert);

