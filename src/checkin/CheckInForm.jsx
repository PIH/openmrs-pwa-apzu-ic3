import React from 'react';
import CheckInEncounters from "./CheckInEncounters";
import ReferralForm from './ReferralForm';
import { Grid, Row, Col, FormGroup, ControlLabel } from 'react-bootstrap';
import utils from '../utils.js';
import '../assets/css/LoginPage.css';
import { colHeight, littlePaddingLeft, divContainer, rowStyles, historySection, centerTextAlign } from '../pwaStyles';



class CheckinForm extends React.Component{


  render() {

    return (
      <div style={divContainer}>
        <Grid style={divContainer}>
          <Row style={rowStyles}>
            <Col sm={20} md={20} style={littlePaddingLeft}>
              <span><h3>Patient Check-In</h3></span>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col sm={6} style={ historySection }>
              <span style={centerTextAlign}><h1>Summary</h1></span>
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
                {(typeof this.props.patient !== 'undefined') && (this.props.patient !== null) &&
                <Row>
                  <FormGroup controlId="formAddress">
                    <Col
                      componentClass={ControlLabel}
                      sm={2}
                    >
                      <u> Address:</u>
                    </Col>
                    <Col sm={4}>
                      { this.props.patient.address.village }<br/>
                      { this.props.patient.address.traditionalAuthority }<br/>
                      { this.props.patient.address.district }<br/>
                      <br/>
                    </Col>

                  </FormGroup>
                </Row>
                }
                {(typeof this.props.patient !== 'undefined') && (this.props.patient !== null) &&
                <Row>
                  <FormGroup controlId="formPhoneNumber">
                    <Col componentClass={ControlLabel} sm={2}>
                      <u>Phone:</u>
                    </Col>
                    <Col sm={2}>
                      { this.props.patient.phoneNumber }<br/><br/>
                    </Col>
                  </FormGroup>
                </Row>
                }
                {(typeof this.props.patient !== 'undefined') && (this.props.patient !== null) &&
                <Row>
                  <FormGroup controlId="formChw">
                    <Col componentClass={ControlLabel} sm={2}>
                      <u>CHW:</u>
                    </Col>
                    <Col sm={4}>
                      { this.props.patient.chw }<br/><br/>
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
                <CheckInEncounters></CheckInEncounters>
              </Grid>
            </Col>
            <Col sm={6}>
              <span style={centerTextAlign}><h1>Today: {utils.formatCalendarDate(new Date())}</h1></span>
              <ReferralForm
                patient={ this.props.patient }
                backLink={ this.props.backLink }
              />
            </Col>
          </Row>

        </Grid>

      </div>
    );
  }
};


export default CheckinForm;

