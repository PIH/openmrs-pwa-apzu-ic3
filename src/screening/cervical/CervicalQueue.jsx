import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import { selectors } from '@openmrs/react-components';
import cervicalFilters from './cervicalFilters';
import ScreeningQueue from "../ScreeningQueue";

const CervicalQueue = props => {
  const rowSelectedActionCreators = [
    () => push('/screening'),
  ];

  return (
    <div>
      <ScreeningQueue
        dispatch={props.dispatch}
        filters={[cervicalFilters.required, cervicalFilters.notCompleted]}
        rowData={Object.values(props.patients)}
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="Cervical Cancer Screening Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: selectors.getPatientStore(state),
  };
};

export default connect(mapStateToProps)(CervicalQueue);
