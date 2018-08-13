import React from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import patientActions from '../patient/patientActions';

class HomePage extends React.Component {

  componentDidMount() {
    this.props.dispatch(patientActions.clearPatientSelected());
  }

  render() {
    return (
      <div className="App">
        <div>
          <Link to="/searchPatient">
            <ButtonGroup>
              <Button bsSize="large" >
                <Glyphicon glyph="check" /> Search Patient
              </Button>
            </ButtonGroup>
          </Link>
          <Link to="/checkin/checkInTabs">
            <ButtonGroup>
              <Button bsSize="large" >
                <Glyphicon glyph="check" /> Check-In
              </Button>
            </ButtonGroup>
          </Link>
          <Link to="/screening/bloodPressure/queue">
            <ButtonGroup>
              <Button bsSize="large" >
                <Glyphicon glyph="check" /> Blood Pressure Screening
              </Button>
            </ButtonGroup>
          </Link>
          <Link to="/screening/nutrition/queue">
            <ButtonGroup>
              <Button bsSize="large" >
                <Glyphicon glyph="check" /> Nutrition Screening
              </Button>
            </ButtonGroup>
          </Link>
          <Link to="/screening/nurse/queue">
            <ButtonGroup>
              <Button bsSize="large" >
                <Glyphicon glyph="check" /> Nurse Evaluation
              </Button>
            </ButtonGroup>
          </Link>
        </div>

      </div>
    )
  }
}

export default connect()(HomePage);
