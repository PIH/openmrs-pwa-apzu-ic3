import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import { selectors } from '@openmrs/react-components';
import tbFilters from './tbFilters';
import ScreeningQueue from "../ScreeningQueue";

// TODO can we figure out a better way to do this without passing dispatch all the way through?

let TbQueue = props => {

  const rowSelectedActionCreators = [
    () => push('/screening'),
  ];

  return (
    <div>
      <ScreeningQueue
        dispatch={props.dispatch}
        filters={[tbFilters.required, (patient) => !tbFilters.completed(patient)]}
        rowData={Object.values(props.patients)}
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="TB Screening Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: selectors.getPatientStore(state),
  };
};

export default connect(mapStateToProps)(TbQueue);
