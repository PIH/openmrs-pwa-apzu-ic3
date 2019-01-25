import React from 'react';
import { BasicLayout, SystemAlert } from '@openmrs/react-components';
import logo from "../assets/images/pih_apzu_logo_white.png";
import potraitLogo from '../assets/images/hands_logo.png';
import { NAV_MENU_PAGES, USER_MENU_PAGES } from '../constants';
import Footer from '../footer/Footer';
import PatientAlert from '../patient/PatientAlert';
import utils from '../utils';

const Layout = props => {

  return (
    <div>
      <SystemAlert />
      <BasicLayout
        identifiersToDisplay={utils.getIdentifiersToDisplay}
        logo={logo}
        navMenuPages={NAV_MENU_PAGES}
        PatientAlert={PatientAlert}
        smallWidthLogo={potraitLogo}
        userMenuPages={USER_MENU_PAGES}
        {...props}
      />
      <Footer />
    </div>
  );
};

export default Layout;

