import React from 'react';
import { Navbar } from 'react-bootstrap';
import Menu from './Menu';
import PatientHeader from '../patient/PatientHeader';

class Header extends React.Component {

  render() {
    return (
      <div>
        <Navbar>
          <PatientHeader />
        </Navbar>
        <Menu />
      </div>
    );
  }
}

export default Header;
