import React from 'react';
import { connect } from 'react-redux';
import {selectors} from '@openmrs/react-components';
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
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(HtcPage);

