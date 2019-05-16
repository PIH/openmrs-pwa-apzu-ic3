import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import { selectors } from '@openmrs/react-components';
import cliniicianFilters from './clinicianFilters';
import ScreeningQueue from "../ScreeningQueue";

// TODO can we figure out a better way to do this without passing dispatch all the way through?

let ClinicianQueue = props => {

  const rowSelectedActionCreators = [
    () => push('/screening'),
  ];

  return (
    <div>
      <ScreeningQueue
        dispatch={props.dispatch}
        filters={[cliniicianFilters.required, (patient) => !cliniicianFilters.completed(patient)]}
        rowData={Object.values(props.patients)}
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="Clinician Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: selectors.getPatientStore(state),
  };
};

export default connect(mapStateToProps)(ClinicianQueue);
