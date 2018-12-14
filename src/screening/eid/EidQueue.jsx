import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import {selectors} from '@openmrs/react-components';
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
        filters={[eidFilters.required, (patient) => !eidFilters.completed(patient)]}
        rowData={ Object.values(props.patients) }
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="EID Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: selectors.getPatientStore(state)
  };
};

export default connect(mapStateToProps)(EidQueue);
