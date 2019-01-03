import React from 'react';
import {BasicLayout, SystemAlert} from '@openmrs/react-components';
import logo from "../assets/images/pih_apzu_logo_white.png";
import potraitLogo from '../assets/images/hands_logo.png';
import { NAV_MENU_PAGES, USER_MENU_PAGES, IDENTIFIER_TYPES } from '../constants';

const Layout = props => {

  return (
    <div>
      <SystemAlert/>
      <BasicLayout
        identifierTypesToDisplay={
          [IDENTIFIER_TYPES.ART_IDENTIFIER_TYPE,
            IDENTIFIER_TYPES.EID_IDENTIFIER_TYPE,
            IDENTIFIER_TYPES.NCD_IDENTIFIER_TYPE]
        }
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

