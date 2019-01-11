import React from 'react';
import {BasicLayout, SystemAlert} from '@openmrs/react-components';
import logo from "../assets/images/pih_apzu_logo_white.png";
import potraitLogo from '../assets/images/hands_logo.png';
import {NAV_MENU_PAGES, USER_MENU_PAGES} from '../constants';

const Layout = props => {

  return (
    <div>
      <SystemAlert/>
      <BasicLayout
        logo={logo}
        smallWidthLogo={potraitLogo}
        navMenuPages={NAV_MENU_PAGES}
        userMenuPages={USER_MENU_PAGES}
        {...props}
      />
    </div>
  );
};

export default Layout;

