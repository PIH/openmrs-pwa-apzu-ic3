import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { LOCATION_TYPES } from '../constants';
import patientActions from '../patient/patientActions';
import checkInActions from  '../checkin/checkInActions';
import utils from "../utils";

class HomePage extends React.Component {

  componentDidMount() {
    // TODO this could really be after log-in, if this isn't going to change?
    this.props.dispatch(checkInActions.getExpectedToCheckIn(this.props.location,  utils.formatReportRestDate(new Date())));

    this.props.dispatch(patientActions.clearPatientSelected());
  }

  render() {
    return (
      <div className="App">
        <div>
          <Link to="/searchPatient">
            <ButtonGroup>
              <Button bsSize="large" >
                <FontAwesomeIcon icon="check" /> Search Patient
              </Button>
            </ButtonGroup>
          </Link>
          <Link to="/checkin/checkInTabs">
            <ButtonGroup>
              <Button bsSize="large" >
                <FontAwesomeIcon icon="check" />  Check-In
              </Button>
            </ButtonGroup>
          </Link>
          <Link to="/screening/bloodPressure/queue">
            <ButtonGroup>
              <Button bsSize="large" >
                <FontAwesomeIcon icon="check" />  Blood Pressure Screening
              </Button>
            </ButtonGroup>
          </Link>
          <Link to="/screening/nutrition/queue">
            <ButtonGroup>
              <Button bsSize="large" >
                <FontAwesomeIcon icon="check" />  Nutrition Screening
              </Button>
            </ButtonGroup>
          </Link>
          <Link to="/screening/nurse/queue">
            <ButtonGroup>
              <Button bsSize="large" >
                <FontAwesomeIcon icon="check" />  Nurse Evaluation
              </Button>
            </ButtonGroup>
          </Link>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.openmrs.session.sessionLocation ? state.openmrs.session.sessionLocation.uuid : LOCATION_TYPES.UnknownLocation
  };
};


export default connect(mapStateToProps)(HomePage);
