import React from 'react';
import {Col, ControlLabel, FormGroup, Grid, Row} from "react-bootstrap";
import {colHeight} from "../pwaStyles";
import CheckInEncounters from "./CheckInEncounters";

const CheckInSummary = props => {

  return (
    <Grid>
      <Row>
        <Col>
          <span><h4>Demographics</h4></span>
        </Col>
      </Row>
      {(typeof props.patient !== 'undefined') && (props.patient !== null) &&
      <span>
          <Row>
            <Col
              componentClass={ControlLabel}
            >
              Address
            </Col>
          </Row>
          <Row>
            <Col>
              {props.patient.address.village}<br/>
              {props.patient.address.traditionalAuthority}<br/>
              {props.patient.address.district}<br/>
              <br/>
            </Col>
          </Row>
        </span>
      }
      {(typeof props.patient !== 'undefined') && (props.patient !== null) &&
      <span>
          <Row>
            <Col componentClass={ControlLabel}>
              Phone
            </Col>
          </Row>
          <Row>
            <Col>
              {props.patient.phoneNumber}
            </Col>
          </Row>
        </span>
      }
      {(typeof props.patient !== 'undefined') && (props.patient !== null) &&
      <span>
          <Row>
            <Col componentClass={ControlLabel}>
              CHW
            </Col>
          </Row>
          <Row>
            <Col>
              {props.patient.chw}
            </Col>
          </Row>
        </span>
      }

      <Row>
        <Col>
          <span><h4>History</h4></span>
        </Col>
      </Row>
      <CheckInEncounters/>
    </Grid>
  );
};

export default CheckInSummary;
