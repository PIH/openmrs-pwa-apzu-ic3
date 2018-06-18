import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class Navigation extends React.Component {

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Home</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to="/searchPatient">
            <NavItem>Search Patient</NavItem>
          </LinkContainer>
          <LinkContainer to="/checkin/checkinQueue">
            <NavItem>Check-In</NavItem>
          </LinkContainer>
          <NavDropdown title="Screening" id="basic-nav-dropdown">
            <LinkContainer to="/screening/bloodPressure/queue">
              <MenuItem>Blood Pressure</MenuItem>
            </LinkContainer>
            <LinkContainer to="/screening/nutrition/queue">
              <MenuItem>Nutrition</MenuItem>
            </LinkContainer>
            <MenuItem divider />
            <MenuItem>TB</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default Navigation;
