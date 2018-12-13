import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import {selectors} from '@openmrs/react-components';
import ScreeningQueue from "../ScreeningQueue";
import adherenceFilters from './adherenceFilters';

let AdherenceQueue = props => {

  const rowSelectedActionCreators = [
    () => push('/screening/adherence/form')
  ];


  return (
    <div>
      <ScreeningQueue
        dispatch={ props.dispatch }
        filters={[adherenceFilters.required, (patient) => !adherenceFilters.completed(patient)]}
        rowData={ Object.values(props.patients) }
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="Adherence Counseling"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: selectors.getPatientStore(state)
  };
};

export default connect(mapStateToProps)(AdherenceQueue);
