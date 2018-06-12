import React from "react";
import { connect } from "react-redux";

import { Grid, Row, Col } from 'react-bootstrap';

class InfoPatient extends React.Component {

    
  render() {
    return (
      <form>
        <Grid>
          <Row>
            <Col>
              <label>ID: </label>
              <input
                defaultValue={this.props.patient.id}
                name="patientId"
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <label>UUID: </label>
              <input
                defaultValue={this.props.patient.uuid}
                name="uuid"
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <label>Identifier: </label>
              <input
                defaultValue={this.props.patient.identifier}
                name="uuid"
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <label>First Name: </label>
              <input
                defaultValue={this.props.patient.firstName}
                name="patientId"
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <label>Last Name: </label>
              <input
                defaultValue={this.props.patient.lastName}
                name="patientId"
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <label>Gender: </label>
              <input
                defaultValue={this.props.patient.gender}
                name="patientId"
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <label>Age: </label>
              <input
                defaultValue={this.props.patient.age}
                name="patientId"
                type="text"
              />
            </Col>
          </Row>
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    patient: state.selected.patient
  };
};

export default connect(mapStateToProps)(InfoPatient);
