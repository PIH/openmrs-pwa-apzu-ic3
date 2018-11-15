import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import {selectors} from "@openmrs/react-components";
import ScreeningTabs from "../ScreeningTabs";
import bloodPressureFilters from './bloodPressureFilters';

// TODO can we figure out a better way to do this without passing dispatch all the way through?

let BloodPressureQueue = props => {

  const rowSelectedActionCreators = [
    () => push('/screening/bloodPressure/form')
  ];

  return (
    <div>

      <ScreeningTabs
        dispatch={ props.dispatch }
        filters={ bloodPressureFilters }
        rowData={ Object.values(props.patients) }
        rowSelectedActionCreators={ rowSelectedActionCreators }
        tabsId="bp-tabs"
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
