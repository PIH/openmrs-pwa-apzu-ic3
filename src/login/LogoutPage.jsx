import React from 'react';
import { connect } from 'react-redux';
import { LoadingView, loginActions, loginRest } from '@openmrs/react-components';
import { redirectToServerLogin } from './serverLogin';
import ServerUnavailable from './ServerUnavailable';

// Ends the server session before going to the login page, so the redirect can't cut the request off
class LogoutPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { unavailable: false };
    this.goToLogin = this.goToLogin.bind(this);
  }

  componentDidMount() {
    loginRest.logout()
      .catch(() => {})
      .then(() => {
        this.props.dispatch(loginActions.logoutSucceeded());
        this.goToLogin();
      });
  }

  goToLogin() {
    this.setState({ unavailable: false });
    redirectToServerLogin().catch(() => this.setState({ unavailable: true }));
  }

  render() {
    return this.state.unavailable ? <ServerUnavailable onRetry={this.goToLogin}/> : <LoadingView/>;
  }
}

export default connect()(LogoutPage);
