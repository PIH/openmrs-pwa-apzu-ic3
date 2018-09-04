import React from 'react';
import { connect } from 'react-redux';
import HtcFrom from './HtcForm';
import PatientAlert from '../../patient/PatientAlert';

let HtcPage = (props) => {

  return (
    <div>
      <PatientAlert/>
      <HtcFrom/>
    </div>
  );
};

export default connect(state => {
  return {
    patient: state.selectedPatient ? state.patients[state.selectedPatient] : null
  };
})(HtcPage);

