import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import {selectors} from '@openmrs/react-components';
import ScreeningQueue from "../ScreeningQueue";
import vlFilters from './vlFilters';

let VLQueueComplete = props => {

  const rowSelectedActionCreators = [
    () => push('/checkin/checkInComplete')
  ];


  return (
    <div>
      <ScreeningQueue
        dispatch={ props.dispatch }
        filters={[vlFilters.completed]}
        rowData={ Object.values(props.patients) }
        rowSelectedActionCreators={rowSelectedActionCreators}
        onRowCount={ props.onRowCount }
        title="VL Completed"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: selectors.getPatientStore(state)
  };
};

export default connect(mapStateToProps)(VLQueueComplete);
