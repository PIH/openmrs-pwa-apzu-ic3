import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import ScreeningQueue from "../ScreeningQueue";
import vlFilters from './vlFilters';

let VLQueue = props => {

  const rowSelectedActionCreators = [
    () => push('/screening/vl/form')
  ];


  return (
    <div>
      <ScreeningQueue
        dispatch={ props.dispatch }
        filters={ vlFilters.required }
        rowData={ Object.values(props.patients) }
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="Viral Load Test Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: state.openmrs.patients,
  };
};

export default connect(mapStateToProps)(VLQueue);
