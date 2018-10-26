import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import {patientActions, selectors} from '@openmrs/react-components';
import ScreeningQueue from "../screening/ScreeningQueue";
import actionVisitFilters from './activeVisitsFilters';


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
        filters={ actionVisitFilters }
        rowData={ Object.values(props.patients) }
        onRowCount={ props.onRowCount }
        rowSelectedActionCreators={ rowSelectedActionCreators }
        title="Active Visits"
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


