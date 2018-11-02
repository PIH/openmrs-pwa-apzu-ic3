import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import { selectors } from '@openmrs/react-components';
import ScreeningTabs from "../ScreeningTabs";
import htcFilters from './htcFilters';
import { BASIC_GRID, COLUMN_DEFS } from "../../gridConstants";


let HtcQueue = props => {

  const rowSelectedActionCreators = [
    () => push('/screening/htc/page')
  ];

  const columnDefs = [
    ...BASIC_GRID,
    COLUMN_DEFS.CHECKED_IN_TIME,
    COLUMN_DEFS.ACTIONS,
    COLUMN_DEFS.APPOINTMENT_DATE
  ];

  return (
    <div>
      <ScreeningTabs
        dispatch={ props.dispatch }
        columnDefs = { columnDefs }
        filters={ htcFilters }
        rowData={ Object.values(props.patients) }
        rowSelectedActionCreators={ rowSelectedActionCreators }
        title="HTC Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: selectors.getPatientStore(state)
  };
};

export default connect(mapStateToProps)(HtcQueue);
