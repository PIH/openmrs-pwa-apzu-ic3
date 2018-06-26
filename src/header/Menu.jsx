import React from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { slide as BurgerMenu } from 'react-burger-menu';

class Menu extends React.Component {

  render() {
    return (
      <BurgerMenu right noOverlay pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
        <Link to="/searchPatient">
          <Button bsSize="large" block>
            Search Patient
          </Button>
        </Link>
        <Link to="/checkin/checkinQueue">
          <Button bsSize="large" block>
            Check-In
          </Button>
        </Link>
        <Link to="/screening/bloodPressure/queue">
          <Button bsSize="large" block>
            Blood Pressure
          </Button>
        </Link>
        <Link to="/screening/nutrition/queue">
          <Button bsSize="large" block>
            Nutrition
          </Button>
        </Link>
      </BurgerMenu>
    );
  }
}

export default Menu;
