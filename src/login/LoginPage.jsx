import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Login } from '@openmrs/react-components';
import homeImage from "../assets/images/Magaleta_IC3_clinic.jpg";
import logo from "../assets/images/pih_apzu_logo_white.png";
import '../assets/css/LoginPage.css';
import '../assets/css/background.css';

const LoginPage = props => {
  const { from } = props.location.state || { from: { pathname: "/" } };

  if (props.session.authenticated === true) {
    return <Redirect to={from} />;
  }
  else {
    return(
      <div class="background darken-pseudo" style={{backgroundImage: 'url(' + homeImage + ')'}}>
        <div class="foreground">
          <img class="loginLogo" src={logo} alt='' />
          <Login/>
        </div>
      </div>
    );
  }
};

LoginPage.propTypes = {
  location: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return { session: state.openmrs.session };
};

export default connect(mapStateToProps)(LoginPage);


