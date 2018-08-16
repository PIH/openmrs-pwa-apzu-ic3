import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { LOCATION_TYPES } from '../constants';

class HomePage extends React.Component {

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
