import React from 'react';
import { Navbar, NavItem, MenuItem } from 'react-bootstrap';
import PatientHeader from './PatientHeader';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { slide as BurgerMenu } from 'react-burger-menu';

class Navigation extends React.Component {

  render() {
    return (
      <div>
        <Navbar>
          <PatientHeader/>
        </Navbar>
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
      </div>
    );
  }
}

export default Navigation;
