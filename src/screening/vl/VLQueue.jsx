import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import {selectors} from '@openmrs/react-components';
import ScreeningQueue from "../ScreeningQueue";
import vlFilters from './vlFilters';
import {BASIC_GRID, COLUMN_DEFS} from "../../gridConstants";

let VLQueue = props => {

  const rowSelectedActionCreators = [
    () => push('/screening/vl/form')
  ];

  const columnDefs = [
    ...BASIC_GRID,
    COLUMN_DEFS.ACTIONS,
    COLUMN_DEFS.APPOINTMENT_DATE,
    COLUMN_DEFS.CHECKED_IN_TIME
  ];

  return (
    <div>
      <ScreeningQueue
        columnDefs={ columnDefs }
        dispatch={ props.dispatch }
        filters={ vlFilters.required }
        rowData={ Object.values(props.patients) }
        rowSelectedActionCreators={rowSelectedActionCreators}
        onRowCount={ props.onRowCount }
        title="Viral Load Test Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: selectors.getPatientStore(state)
  };
};

export default connect(mapStateToProps)(VLQueue);
