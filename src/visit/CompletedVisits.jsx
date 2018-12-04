import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import {patientActions, visitActions, CardList} from '@openmrs/react-components';
import utils from "../utils";
import { ACTIVE_VISITS_REP } from "../constants";
import {BASIC_GRID, COLUMN_DEFS, PATIENT_IDENTIFIER_FILTERS} from "../gridConstants";


let CompletedVisits = props => {

  const columnDefs = [
    ...BASIC_GRID,
    COLUMN_DEFS.CHECKED_IN_TIME,
    COLUMN_DEFS.CHECKED_OUT_TIME
  ];

  const fetchListActionCreator =
    () => props.dispatch(visitActions.fetchInactiveVisits(
      utils.getEndOfYesterday(),
      props.session.sessionLocation ? props.session.sessionLocation.uuid : null,
      ACTIVE_VISITS_REP));

  const onMountOtherActionCreators = [
    () => props.dispatch(patientActions.clearSelectedPatient())
  ];

  const rowSelectedActionCreators = [
    patientActions.setSelectedPatient,
    () =>  push({
      pathname: '/checkin/checkInComplete',
      state: {
        queueLink: '/checkin/checkInTabs'
      }
    })
  ];

  return (
    <div>
      <CardList
        fetchListActionCreator={fetchListActionCreator}
        onMountOtherActionCreators={onMountOtherActionCreators}
        rowData={props.rowData}
        rowSelectedActionCreators={rowSelectedActionCreators}
        title=""
        optionalFilters={ PATIENT_IDENTIFIER_FILTERS }
      />

      {/* <ScreeningQueue
        dispatch={ props.dispatch }
        rowData={ props.rowData }
        onRowCount={ props.onRowCount }
        rowSelectedActionCreators={ rowSelectedActionCreators }
        title=""
      /> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    rowData: state.completedVisits,
    session: state.openmrs.session
  };
};

export default connect(mapStateToProps)(CompletedVisits);


