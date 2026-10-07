import React from 'react';
import { LoadingView } from '@openmrs/react-components';
import { redirectToServerLogin } from './serverLogin';

class LoginPage extends React.Component {

  componentDidMount() {
    redirectToServerLogin();
  }

  render() {
    return <LoadingView/>;
  }
}

export default LoginPage;
