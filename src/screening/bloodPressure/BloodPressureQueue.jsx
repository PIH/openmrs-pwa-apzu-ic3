import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import {selectors} from "@openmrs/react-components";
import ScreeningQueue from "../ScreeningQueue";
import bloodPressureFilters from './bloodPressureFilters';

// TODO can we figure out a better way to do this without passing dispatch all the way through?

let BloodPressureQueue = props => {

  const rowSelectedActionCreators = [
    () => push('/screening/bloodPressure/form')
  ];

  return (
    <div>
      <ScreeningQueue
        dispatch={props.dispatch}
        filters={bloodPressureFilters.required}
        rowData={Object.values(props.patients)}
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="Blood Pressure Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: selectors.getPatientStore(state),
  };
};

export default connect(mapStateToProps)(BloodPressureQueue);
