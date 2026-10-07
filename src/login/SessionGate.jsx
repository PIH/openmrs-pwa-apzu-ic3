import React from 'react';
import { connect } from 'react-redux';
import { axiosInstance, LoadingView, loginActions, sessionActions, sessionRest } from '@openmrs/react-components';
import { handleSessionExpiry, redirectToServerLogin } from './serverLogin';
import ServerUnavailable from './ServerUnavailable';

const userOf = session => session && session.authenticated === true && session.user ? session.user.uuid : null;
const locationOf = session => session && session.sessionLocation ? session.sessionLocation.uuid : null;

// Loads the server session before rendering the app.  Without an authenticated session, goes to the server's
// login page, which the authentication module gives with a 401 from the session endpoint.
export class SessionGate extends React.Component {

  constructor(props) {
    super(props);
    this.state = { status: 'checking' };
    this.checkSession = this.checkSession.bind(this);
  }

  componentDidMount() {
    handleSessionExpiry();
    this.checkSession();
  }

  checkSession() {
    this.setState({ status: 'checking' });
    // credentials persisted from the PWA's former login page must not be sent
    delete axiosInstance.defaults.headers.common['Authorization'];
    sessionRest.fetchCurrentSession().then(
      session => {
        if (session.authenticated === true) {
          this.start(session);
        } else {
          redirectToServerLogin().catch(() => this.setState({ status: 'unavailable' }));
        }
      },
      error => {
        if (error.response && error.response.status === 401) {
          redirectToServerLogin(error.response.headers.location).catch(() => this.setState({ status: 'unavailable' }));
        } else {
          // eg. offline or a server error: don't send the user away, as they may well still be logged in
          this.setState({ status: 'unavailable' });
        }
      });
  }

  // The app's state is persisted for the tab, so a reload, or logging back in as the same user, carries on where they
  // were.  Otherwise, as react-components' login does, start the app afresh, which loads its data (see ic3Sagas).
  start(session) {
    const previousUser = userOf(this.props.session);
    if (previousUser !== userOf(session)) {
      if (previousUser) {
        this.props.dispatch(loginActions.logoutSucceeded());  // clears the previous user's state
      }
      this.props.dispatch(sessionActions.fetchSessionSucceeded(session));
      this.props.dispatch(loginActions.loginSucceeded());
    } else if (locationOf(this.props.session) !== locationOf(session)) {
      // logged back in at another location: as when changing location in the app, which reloads its patients
      this.props.dispatch(sessionActions.setSessionSucceeded(session));
    } else {
      this.props.dispatch(sessionActions.fetchSessionSucceeded(session));
    }
    this.setState({ status: 'authenticated' });
  }

  render() {
    if (this.state.status === 'authenticated') {
      return this.props.children;
    }
    if (this.state.status === 'unavailable') {
      return <ServerUnavailable onRetry={this.checkSession}/>;
    }
    return <LoadingView/>;
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.openmrs.session
  };
};

export default connect(mapStateToProps)(SessionGate);
