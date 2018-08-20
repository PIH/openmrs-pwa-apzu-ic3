import React from 'react';
import ScreeningList from '../screening/ScreeningList';

let LeftRail = props => {

  return(
    <div>
      <ScreeningList patient={props.patient}/>
    </div>
  );
};

export default LeftRail;
