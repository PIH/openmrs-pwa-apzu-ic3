import React from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="App">

    <b>Home Page</b>
    <br />
    <br />
    <div>
      <Link to="/searchPatient">
        <ButtonGroup>
          <Button bsSize="large" >
            <Glyphicon glyph="check" /> Search Patient
          </Button>
        </ButtonGroup>
      </Link>
      <Link to="/checkin/checkinQueue">
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
    </div>

  </div>
);

export default HomePage;
