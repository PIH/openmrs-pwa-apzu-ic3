import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import {selectors} from '@openmrs/react-components';
import ScreeningQueue from "../ScreeningQueue";
import nurseFilters from './nurseFilters';

// TODO can we figure out a better way to do this without passing dispatch all the way through?

let NurseQueue = props => {

  const rowSelectedActionCreators = [
    () => push({
      pathname: '/screening',
      state: {
        queueLink: '/screening/nurse/queue'
      }
    })
  ];

  return (
    <div>
      <ScreeningQueue
        dispatch={props.dispatch}
        filters={[(patient) => !nurseFilters.completed(patient)]}
        rowData={Object.values(props.patients)}
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="Nurse Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: selectors.getPatientStore(state)
  };
};

export default connect(mapStateToProps)(NurseQueue);
