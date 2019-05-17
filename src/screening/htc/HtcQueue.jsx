import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import { selectors } from '@openmrs/react-components';
import htcFilters from './htcFilters';
import ScreeningQueue from "../ScreeningQueue";

const HtcQueue = props => {
  const rowSelectedActionCreators = [
    () => push('/screening'),
  ];

  return (
    <div>
      <ScreeningQueue
        dispatch={props.dispatch}
        filters={[htcFilters.required]}
        rowData={Object.values(props.patients)}
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="HTC Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: selectors.getPatientStore(state),
  };
};

export default connect(mapStateToProps)(HtcQueue);
