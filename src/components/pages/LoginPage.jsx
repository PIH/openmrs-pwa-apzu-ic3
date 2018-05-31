import React from 'react';
import { Header } from '@openmrs/react-components';
import { Login } from '@openmrs/react-components';

const LoginPage = props => {
  return (
    <div className="App">
      <Header />
      <Login />
    </div>
  );
};

export default LoginPage;

