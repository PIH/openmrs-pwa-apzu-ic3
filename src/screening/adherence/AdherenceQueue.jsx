import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
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
        filters={ adherenceFilters.required }
        rowData={ Object.values(props.patients) }
        onRowCount={ props.onRowCount }
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="Adherence Counseling"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: state.patients,
  };
};

export default connect(mapStateToProps)(AdherenceQueue);
