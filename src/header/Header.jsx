import React from 'react';
import Menu from './Menu';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../assets/css/header.css';
import logo from "../assets/images/pih_apzu_logo_white.png";

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDropdown: false,
      locationDropdown: false,
    };
  }

  componentDidMount() {
  }

  toggleState = (key, value) => {
    this.setState(() => ({
      [key]: value || !this.state[key],
    }));
  }

  render() {

    return (
      <Navbar
        className="header"
        fixedTop={false}
      >
        <Nav>
          <Menu/>
          <NavItem href={"#/"}>
            <img className="logo"
                 alt=""
                 src={logo}
            />
          </NavItem>
          <NavDropdown eventKey={1} title="Menu" id="dropdown">
            <MenuItem eventKey={1.1} href={"#/"}>Home</MenuItem>
            <MenuItem eventKey={1.2} href={"#/searchPatient"}>Search Patient</MenuItem>
            <MenuItem eventKey={1.3} href={"#/checkin/checkInTabs"}>Check-In</MenuItem>
          </NavDropdown>
          <NavDropdown eventKey={2} title={this.props.sessionLocation.display} id="dropdown">
          </NavDropdown>
          <NavDropdown eventKey={3} title={this.props.user.person.display} id="dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  const { sessionLocation, user } = state.openmrs.session;
  const { list } = state.openmrs.loginLocations;

  return {
    sessionLocation,
    user,
    locations: list,
  };
};

Header.propTypes = {
  locations: PropTypes.array.isRequired,
  sessionLocation: PropTypes.shape({ display: PropTypes.string }),
  user: PropTypes.shape({ display: PropTypes.string })
};

Header.defaultProps = {
  locations: [],
  sessionLocation: {
    display: '',
  },
  user: { display: '' },
};

export default connect(mapStateToProps)(Header);
