import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { axiosInstance, LoadingView, loginActions, sessionActions, sessionRest } from '@openmrs/react-components';
import { redirectToServerLogin } from './serverLogin';

// Loads the server session before rendering the app.  Without an authenticated session, goes to the server's
// login page, which the authentication module gives with a 401 from the session endpoint.
export class SessionGate extends React.Component {

  constructor(props) {
    super(props);
    this.state = { status: 'checking' };
    this.checkSession = this.checkSession.bind(this);
  }

  componentDidMount() {
    this.checkSession();
  }

  checkSession() {
    this.setState({ status: 'checking' });
    // credentials persisted from the PWA's former login page must not be sent
    delete axiosInstance.defaults.headers.common['Authorization'];
    sessionRest.fetchCurrentSession()
      .then(session => {
        if (session.authenticated === true) {
          // as react-components' login does, which starts loading the app's data (see ic3Sagas)
          this.props.dispatch(sessionActions.fetchSessionSucceeded(session));
          this.props.dispatch(loginActions.loginSucceeded());
          this.setState({ status: 'authenticated' });
        } else {
          redirectToServerLogin();
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          redirectToServerLogin(error.response.headers.location);
        } else {
          // eg. offline or a server error: don't send the user away, as they may well still be logged in
          this.setState({ status: 'unavailable' });
        }
      });
  }

  render() {
    if (this.state.status === 'authenticated') {
      return this.props.children;
    }
    if (this.state.status === 'unavailable') {
      return (
        <div style={{ padding: '20px' }}>
          <p>The server could not be reached.</p>
          <Button onClick={this.checkSession}>Retry</Button>
        </div>
      );
    }
    return <LoadingView/>;
  }
}

export default connect()(SessionGate);
