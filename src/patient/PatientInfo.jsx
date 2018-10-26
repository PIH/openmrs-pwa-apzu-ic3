import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, FormControl, ControlLabel, Label, Col } from 'react-bootstrap';
import {selectors} from '@openmrs/react-components';

class PatientInfo extends React.Component {

  render() {
    return (

      <div>
        <Link to="/searchPatient">
          <Button bsSize='large' bsStyle='danger'>
            Back to Search
          </Button>
        </Link>
        <h3><Label>Patient Info</Label></h3>
        <Form horizontal>

       {/*   <FormGroup controlId="formPatientIdentifier">
            <Col componentClass={ControlLabel} sm={2}>
              Identifier
            </Col>
            <Col sm={6}>
              <FormControl type="text" placeholder="patientIdentifier" value={this.props.patient.identifier} />
            </Col>
          </FormGroup>
*/}
          <FormGroup controlId="formPatientFirstName">
            <Col componentClass={ControlLabel} sm={2}>
              First Name
            </Col>
            <Col sm={6}>
              <FormControl type="text" placeholder="firstName" defaultValue={this.props.patient.name.givenName} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formPatientLastName">
            <Col componentClass={ControlLabel} sm={2}>
              Last Name
            </Col>
            <Col sm={6}>
              <FormControl type="text" placeholder="lastName" defaultValue={this.props.patient.name.familyName} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formPatientGender">
            <Col componentClass={ControlLabel} sm={2}>
              Gender
            </Col>
            <Col sm={6}>
              <FormControl type="text" placeholder="gender" defaultValue={this.props.patient.gender} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formPatientAge">
            <Col componentClass={ControlLabel} sm={2}>
              Age
            </Col>
            <Col sm={6}>
              <FormControl type="text" placeholder="age" defaultValue={this.props.patient.age} />
            </Col>
          </FormGroup>

        </Form>
  {/*      <RequiredScreenings patientUuid={this.props.patient.uuid} />*/}
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state)
  };
};

export default connect(mapStateToProps)(PatientInfo);
