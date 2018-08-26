import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import ScreeningQueue from "../ScreeningQueue";
import vlFilters from './vlFilters';

let VLQueueComplete = props => {

  const rowSelectedActionCreators = [
    () => push('/screening/vl/form')
  ];


  return (
    <div>
      <ScreeningQueue
        dispatch={ props.dispatch }
        filters={ vlFilters.completed }
        rowData={ Object.values(props.patients) }
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="VL Completed"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: state.patients,
  };
};

export default connect(mapStateToProps)(VLQueueComplete);
