import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import ScreeningQueue from "../ScreeningQueue";

// TODO can we figure out a better way to do this without passing dispatch all the way through?

let BloodPressureQueue = props => {

  const rowSelectedActionCreators = [
    () => push('/screening/bloodPressure/form')
  ];

  return (
    <div>
      <ScreeningQueue
        dispatch={props.dispatch}
        rowData={props.rowData}
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="Blood Pressure Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    rowData: state.screening.bloodPressureQueue,
  };
};

export default connect(mapStateToProps)(BloodPressureQueue);
