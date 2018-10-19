import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import ScreeningQueue from "../ScreeningQueue";
import nurseFilters from './nurseFilters';

// TODO can we figure out a better way to do this without passing dispatch all the way through?

let NurseQueue = props => {

  const rowSelectedActionCreators = [
    () => push({
      pathname: '/screening/nurse/nursePage',
      state: {
        queueLink: '/screening/nurse/queue'
      }
    })
  ];

  return (
    <div>
      <ScreeningQueue
        dispatch={props.dispatch}
        filters={nurseFilters.required}
        rowData={Object.values(props.patients)}
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="Nurse Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: state.openmrs.patients,
  };
};

export default connect(mapStateToProps)(NurseQueue);
