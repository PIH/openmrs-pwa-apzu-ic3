import React from 'react';
import {Col, ControlLabel, FormGroup, Grid, Row} from "react-bootstrap";
import {colHeight} from "../pwaStyles";
import CheckInEncounters from "./CheckInEncounters";

const CheckInSummary = props => {

  return (
    <Grid>
      <Row>
        <Col sm={6} style={colHeight}>
          <span><h1>{''}</h1></span>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <span><h4>Demographic Information</h4></span>
        </Col>
      </Row>
      {(typeof props.patient !== 'undefined') && (props.patient !== null) &&
      <Row>
        <FormGroup controlId="formAddress">
          <Col
            componentClass={ControlLabel}
            sm={2}
          >
            <u> Address:</u>
          </Col>
          <Col sm={4}>
            {props.patient.address.village}<br/>
            {props.patient.address.traditionalAuthority}<br/>
            {props.patient.address.district}<br/>
            <br/>
          </Col>

        </FormGroup>
      </Row>
      }
      {(typeof props.patient !== 'undefined') && (props.patient !== null) &&
      <Row>
        <FormGroup controlId="formPhoneNumber">
          <Col componentClass={ControlLabel} sm={2}>
            <u>Phone:</u>
          </Col>
          <Col sm={2}>
            {props.patient.phoneNumber}<br/><br/>
          </Col>
        </FormGroup>
      </Row>
      }
      {(typeof props.patient !== 'undefined') && (props.patient !== null) &&
      <Row>
        <FormGroup controlId="formChw">
          <Col componentClass={ControlLabel} sm={2}>
            <u>CHW:</u>
          </Col>
          <Col sm={4}>
            {props.patient.chw}<br/><br/>
          </Col>
        </FormGroup>
      </Row>
      }
      <Row>
        <Col sm={6} style={colHeight}>
          <span><h1>{''}</h1></span>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <span><h4>History</h4></span>
        </Col>
      </Row>
      <CheckInEncounters/>
    </Grid>
  );
};

export default CheckInSummary;
