import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import '../assets/css/header.css';
import logo from "../assets/images/pih_apzu_logo_white.png";
import NavBarMenu from './NavBarMenu';
import { NAV_MENU_PAGES, USER_MENU_PAGES} from '../constants';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDropdown: false,
      locationDropdown: false,
    };
  }

  render() {

    return (
      <Navbar className="header" fixedTop >
        <Nav pullLeft id="nav">
          <NavBarMenu
            pathname={this.props.pathname}
            pageOptions={NAV_MENU_PAGES}
            title={<FontAwesomeIcon icon="bars" size="2x" id='navbarIcon'/>}
            noCaret={true}
          />
          <NavItem href={"#/"}>
            <img className="logo"
                 alt=""
                 src={logo}
            />
          </NavItem>
        </Nav>
        <Nav pullRight id="nav">
          <NavDropdown eventKey={2}
                       id="dropdown"
                       title={
                         <span>
                           <FontAwesomeIcon icon="map-marker" size="lg" id="navItemIcon"/>
                           {this.props.sessionLocation.display}
                           </span>
                       }
          >
          </NavDropdown>
          <NavBarMenu
            pathname={this.props.pathname}
            pageOptions={USER_MENU_PAGES}
            id="dropdown"
            title={
               <span>
                 <FontAwesomeIcon icon="user" size="lg" id="navItemIcon"/>
                 {this.props.user.person ? this.props.user.person.display : 'user'}
                 </span>
             }
          >
          </NavBarMenu>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  const { sessionLocation, user } = state.openmrs.session;
  const { list } = state.openmrs.loginLocations;
  const { pathname } = state.router.location;

  return {
    sessionLocation,
    user,
    locations: list,
    pathname
  };
};

Header.propTypes = {
  locations: PropTypes.array.isRequired,
  sessionLocation: PropTypes.shape({ display: PropTypes.string }),
  user: PropTypes.shape({ display: PropTypes.string }),
  pathname: PropTypes.string
};

Header.defaultProps = {
  locations: [],
  sessionLocation: {
    display: '',
  },
  user: { display: '' },
  pathname: ''
};

export default connect(mapStateToProps)(Header);
