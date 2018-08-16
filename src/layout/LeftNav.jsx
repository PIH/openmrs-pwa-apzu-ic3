import React from 'react';
import { connect } from 'react-redux';
import ScreeningList from '../screening/ScreeningList';

let LeftNav = props => {

  return(
    <div>
      {props.patient && props.patient.uuid &&
        <ScreeningList patient={props.patient}/>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patient: state.selectedPatient
  };
};

export default connect(mapStateToProps)(LeftNav);
