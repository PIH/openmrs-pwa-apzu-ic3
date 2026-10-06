import React from 'react';
import { connect } from 'react-redux';
import { LoadingView, sessionActions } from '@openmrs/react-components';
import { redirectToServerLogin } from './serverLogin';

// Loads the server session before rendering the app, replacing whatever session was persisted from before.
// Without an authenticated session, goes to the server's login page.
class SessionGate extends React.Component {

  constructor(props) {
    super(props);
    this.state = { checked: false };
  }

  componentDidMount() {
    this.initialSession = this.props.session;
    this.props.dispatch(sessionActions.fetchSession());
  }

  componentDidUpdate() {
    if (!this.state.checked && this.props.session !== this.initialSession) {
      if (this.props.session.authenticated === true) {
        this.setState({ checked: true });
      } else {
        redirectToServerLogin();
      }
    }
  }

  render() {
    return this.state.checked ? this.props.children : <LoadingView/>;
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.openmrs.session
  };
};

export default connect(mapStateToProps)(SessionGate);
