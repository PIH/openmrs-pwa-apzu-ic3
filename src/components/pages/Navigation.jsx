import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { slide as BurgerMenu } from 'react-burger-menu';

class Navigation extends React.Component {

  render() {
    return (
      <div>
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
            <NavDropdown
              id="basic-nav-dropdown"
              title="Screening"
            >
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
