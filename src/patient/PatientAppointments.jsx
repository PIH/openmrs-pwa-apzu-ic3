import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, FormGroup, ControlLabel, Label, Col } from 'react-bootstrap';
import utils from '../utils';


let PatientAppointments = (props) => {

  return (
    <div>
      <Grid>
        { (typeof props.patient !== 'undefined') && props.patient !== null &&
        (typeof props.patient.lastVisitDate !== 'undefined') &&
        <Row>
          <FormGroup controlId="formAlert">
            <Col sm={4}>
              <ControlLabel>Last Visit Date:</ControlLabel>
              <Label bsStyle="info">
                { utils.formatCalendarDate(props.patient.lastVisitDate) }
              </Label>
            </Col>
            {(typeof props.patient !== 'undefined') && props.patient !== null &&
            (typeof props.patient.lastAppointmentDate !== 'undefined') &&
            <Col sm={4}>
              <ControlLabel>Next Appointment Date: </ControlLabel>
              <Label bsStyle="info">
                { utils.formatCalendarDate(props.patient.lastAppointmentDate) }
              </Label>
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
})(PatientAppointments);

