import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import {selectors} from "@openmrs/react-components";
import bloodPressureFilters from './bloodPressureFilters';
import ScreeningQueue from "../ScreeningQueue";

// TODO can we figure out a better way to do this without passing dispatch all the way through?

let BloodPressureQueue = props => {

  const rowSelectedActionCreators = [
    () => push('/screening')
  ];

  return (
    <div>
      <ScreeningQueue
        dispatch={ props.dispatch }
        filters={[bloodPressureFilters.required, (patient) => !bloodPressureFilters.completed(patient)]}
        rowData={ Object.values(props.patients) }
        rowSelectedActionCreators={ rowSelectedActionCreators }
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
