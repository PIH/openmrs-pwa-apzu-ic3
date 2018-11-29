import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';

let ClinicianForm = () => (
  <Grid>
    <Row>
      <Col sm={4} xsOffset={5}>
        <Col componentClass={ControlLabel}>
            Form goes here
        </Col>
      </Col>
    </Row>
    <Row>
      <Col sm={12}>
        <FormGroup controlId="clinicianForm" />
      </Col>
    </Row>
  </Grid>
);

export default connect(null, null)(ClinicianForm);

