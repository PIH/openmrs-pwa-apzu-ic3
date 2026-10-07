import React from 'react';
import { LoadingView } from '@openmrs/react-components';
import { redirectToServerLogin } from './serverLogin';
import ServerUnavailable from './ServerUnavailable';

// The app sends users here when it finds their session has ended.  Goes to the server's login page, or back into the
// app if they are logged in after all.
export class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { unavailable: false };
    this.goToLogin = this.goToLogin.bind(this);
  }

  componentDidMount() {
    this.goToLogin();
  }

  goToLogin() {
    this.setState({ unavailable: false });
    redirectToServerLogin()
      .then(redirected => {
        if (!redirected) {
          this.props.history.replace('/');
        }
      })
      .catch(() => this.setState({ unavailable: true }));
  }

  render() {
    return this.state.unavailable ? <ServerUnavailable onRetry={this.goToLogin}/> : <LoadingView/>;
  }
}

export default LoginPage;
