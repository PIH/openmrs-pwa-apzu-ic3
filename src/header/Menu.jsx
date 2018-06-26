import React from 'react';
import { NavItem, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { slide as BurgerMenu } from 'react-burger-menu';

class Menu extends React.Component {

  render() {
    return (
      <BurgerMenu right pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
        <Link to="/">Home</Link>
        <LinkContainer to="/searchPatient">
          <NavItem>Search Patient</NavItem>
        </LinkContainer>
        <LinkContainer to="/checkin/checkinQueue">
          <NavItem>Check-In</NavItem>
        </LinkContainer>
        <LinkContainer to="/screening/bloodPressure/queue">
          <MenuItem>Blood Pressure</MenuItem>
        </LinkContainer>
        <LinkContainer to="/screening/nutrition/queue">
          <MenuItem>Nutrition</MenuItem>
        </LinkContainer>
      </BurgerMenu>
    );
  }
}

export default Menu;
