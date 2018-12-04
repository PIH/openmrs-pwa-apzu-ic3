import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import {patientActions, visitActions} from '@openmrs/react-components';
import utils from "../utils";
import { ACTIVE_VISITS_REP } from "../constants";
import {PATIENT_IDENTIFIER_FILTERS} from "../gridConstants";
import ScreeningQueue from '../screening/ScreeningQueue';


let CompletedVisits = props => {
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
    <ScreeningQueue
      fetchListActionCreator={fetchListActionCreator}
      onMountOtherActionCreators={onMountOtherActionCreators}
      rowData={props.rowData}
      rowSelectedActionCreators={rowSelectedActionCreators}
      title=""
      optionalFilters={ PATIENT_IDENTIFIER_FILTERS }
      dispatch={ props.dispatch }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    rowData: state.completedVisits,
    session: state.openmrs.session
  };
};

export default connect(mapStateToProps)(CompletedVisits);


