import React from 'react';
import { BasicLayout } from '@openmrs/react-components';
import ScreeningList from '../screening/ScreeningList';
import logo from "../assets/images/pih_apzu_logo_white.png";
import { NAV_MENU_PAGES, USER_MENU_PAGES, IDENTIFIER_TYPES } from '../constants';

const Layout = props => {

  return (
    <BasicLayout
      identifierTypesToDisplay={
        [IDENTIFIER_TYPES.ART_IDENTIFIER_TYPE,
          IDENTIFIER_TYPES.EID_IDENTIFIER_TYPE,
          IDENTIFIER_TYPES.NCD_IDENTIFIER_TYPE]
      }
      leftRail={<ScreeningList />}
      logo={logo}
      navMenuPages={NAV_MENU_PAGES}
      userMenuPages={USER_MENU_PAGES}
      {...props}
    />
  );
};

export default Layout;

