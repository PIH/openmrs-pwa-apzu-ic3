import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import ScreeningQueue from "../ScreeningQueue";
import eidFilters from './eidFilters';

let EidQueue = props => {

  const rowSelectedActionCreators = [
    () => push('/screening/eid/form')
  ];


  return (
    <div>
      <ScreeningQueue
        dispatch={ props.dispatch }
        filters={ eidFilters.required }
        rowData={ Object.values(props.patients) }
        onRowCount={ props.onRowCount }
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="EID Test Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: state.patients,
  };
};

export default connect(mapStateToProps)(EidQueue);
