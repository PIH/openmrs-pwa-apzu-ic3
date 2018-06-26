import React from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { slide as BurgerMenu } from 'react-burger-menu';

class Menu extends React.Component {

  render() {
    return (
      <BurgerMenu right pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
        <Link to="/searchPatient">
          <Button bsSize="medium" block>
            Search Patient
          </Button>
        </Link>
        <Link to="/checkin/checkinQueue">
          <Button bsSize="medium" block>
            Check-In
          </Button>
        </Link>
        <Link to="/screening/bloodPressure/queue">
          <Button bsSize="medium" block>
            Blood Pressure
          </Button>
        </Link>
        <Link to="/screening/nutrition/queue">
          <Button bsSize="medium" block>
            Nutrition
          </Button>
        </Link>
      </BurgerMenu>
    );
  }
}

export default Menu;
