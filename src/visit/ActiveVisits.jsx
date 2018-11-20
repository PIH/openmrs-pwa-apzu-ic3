import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import {patientActions, selectors} from '@openmrs/react-components';
import ScreeningQueue from "../screening/ScreeningQueue";


// TODO: should this extend the ScreeningQueue?

let ActiveVisits = props => {

  const rowSelectedActionCreators = [
    patientActions.setSelectedPatient,
    () =>  push({
      pathname: '/checkin/checkInPage',
      state: {
        queueLink: '/visit/queue'
      }
    }),
  ];

  return (
    <div>
      <ScreeningQueue
        dispatch={ props.dispatch }
        rowData={ Object.values(props.patients) }
        onRowCount={ props.onRowCount }
        rowSelectedActionCreators={ rowSelectedActionCreators }
        title=""
      />

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: selectors.getPatientStore(state),
    session: state.openmrs.session
  };
};

export default connect(mapStateToProps)(ActiveVisits);


