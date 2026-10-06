import React from 'react';
import { connect } from 'react-redux';
import { LoadingView, loginActions, loginRest } from '@openmrs/react-components';
import { redirectToServerLogin } from './serverLogin';

// Ends the server session before going to the login page, so the redirect can't cut the request off
class LogoutPage extends React.Component {

  componentDidMount() {
    loginRest.logout()
      .catch(() => {})
      .then(() => {
        this.props.dispatch(loginActions.logoutSucceeded());
        redirectToServerLogin();
      });
  }

  render() {
    return <LoadingView/>;
  }
}

export default connect()(LogoutPage);
