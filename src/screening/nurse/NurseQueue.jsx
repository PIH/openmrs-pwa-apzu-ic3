import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import ScreeningQueue from "../ScreeningQueue";

// TODO can we figure out a better way to do this without passing dispatch all the way through?

let NurseQueue = props => {

  const rowSelectedActionCreators = [
    () => push({
      pathname: '/nurse/nursePage',
      state: {
        queueLink: '/screening/nurse/queue'
      }
    })
  ];

  return (
    <div>
      <ScreeningQueue
        dispatch={props.dispatch}
        rowData={props.rowData}
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="Nurse Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    rowData: state.screening.nurseQueue,
  };
};

export default connect(mapStateToProps)(NurseQueue);
