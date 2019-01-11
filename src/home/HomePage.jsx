import React from 'react';
import {HomePage as ReactComponentsHomePage} from '@openmrs/react-components';
import homeImage from "../assets/images/Malawi_hut.jpg";

const HomePage = (props) => {

  return (
    <ReactComponentsHomePage
      homeImage={homeImage}
    />
  );

};

export default HomePage;
