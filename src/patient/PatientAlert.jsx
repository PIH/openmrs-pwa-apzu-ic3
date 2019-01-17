import React from 'react';
import { connect } from 'react-redux';
import { Alert, Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import {selectors} from '@openmrs/react-components';

let PatientAlert = (props) => {

  return (
    <div>
      <Grid>
        { (typeof props.patient !== 'undefined') && props.patient !== null &&
        (typeof props.patient.alert !== 'undefined') && props.patient.alert !== null &&
        <Row>
          <FormGroup controlId="formAlert">
            <Col sm={ 12 }>
              <ControlLabel>Alert</ControlLabel>
              <Alert bsStyle="danger">
                { props.patient.alert.map(a => a.name) }
              </Alert>
            </Col>
          </FormGroup>
        </Row>
        }
      </Grid>
    </div>
  );
};

export default connect(state => {
  return {
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(PatientAlert);

