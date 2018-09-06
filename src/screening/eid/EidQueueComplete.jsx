import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import ScreeningQueue from "../ScreeningQueue";
import eidFilters from './eidFilters';

let EidQueueComplete = props => {

  const rowSelectedActionCreators = [
    () => push('/checkin/checkInComplete')
  ];


  return (
    <div>
      <ScreeningQueue
        dispatch={ props.dispatch }
        filters={ eidFilters.completed }
        rowData={ Object.values(props.patients) }
        onRowCount={ props.onRowCount }
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="EID Completed"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: state.patients,
  };
};

export default connect(mapStateToProps)(EidQueueComplete);
