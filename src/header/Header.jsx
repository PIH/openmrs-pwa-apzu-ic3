import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import NavMenu from './NavMenu';
import PatientHeader from '../patient/PatientHeader';

class Header extends React.Component {

  render() {
    return (
      <div>
        <AppBar position="static">
          <NavMenu />
          <PatientHeader />
        </AppBar>
      </div>
    );
  }
}

export default Header;
