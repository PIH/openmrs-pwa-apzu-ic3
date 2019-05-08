import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import { selectors } from "@openmrs/react-components";
import ScreeningQueue from "../screening/ScreeningQueue";

// TODO can we figure out a better way to do this without passing dispatch all the way through?

const AllPatientsQueue = props => {
  const rowSelectedActionCreators = [
    () => push('/screening')
  ];
  return (
    <div>
      <ScreeningQueue
        dispatch={props.dispatch}
        excludeCheckedInPatients={false}
        rowData={Object.values(props.patients)}
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="All Patients Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: selectors.getPatientStore(state),
  };
};

export default connect(mapStateToProps)(AllPatientsQueue);
