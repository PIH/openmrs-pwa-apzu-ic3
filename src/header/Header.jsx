import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../assets/css/header.css';
import logo from "../assets/images/pih_apzu_logo_white.png";
import { sessionActions, headerActions, loginActions } from '@openmrs/react-components';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDropdown: false,
      locationDropdown: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(sessionActions.fetchSession());
    this.props.dispatch(loginActions.getLoginLocations());
    this.props.dispatch(headerActions.getHeaderLogoLinks());
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
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">
              <img className="logo"
                   alt=""
                   src={logo}
              />
            </a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavDropdown eventKey={1} title="Dropdown" id="dropdown">
          </NavDropdown>
          <NavDropdown eventKey={3} title={this.props.user ? this.props.user.display : null} className="dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.4}>Separated link</MenuItem>
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
