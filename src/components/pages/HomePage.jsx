import React from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RequiredScreenings from '../../screening/RequiredScreenings';

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
      <Link to="/screening/bloodPressureQueue">
        <ButtonGroup>
          <Button bsSize="large" >
            <Glyphicon glyph="check" /> Blood Pressure Screening
          </Button>
        </ButtonGroup>
      </Link>
      <Link to="/screening/nutritionQueue">
        <ButtonGroup>
          <Button bsSize="large" >
            <Glyphicon glyph="check" /> Nutrition Screening
          </Button>
        </ButtonGroup>
      </Link>
      <RequiredScreenings />
    </div>

  </div>
);

export default HomePage;
