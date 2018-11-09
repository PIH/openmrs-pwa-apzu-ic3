import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import {patientActions, visitActions, List} from '@openmrs/react-components';
import utils from "../utils";
import { ACTIVE_VISITS_REP } from "../constants";
import { PATIENT_IDENTIFIER_FILTERS } from "../gridConstants";


let CompletedVisits = props => {

  const columnDefs = [
    { headerName: 'uuid', hide: true, field: 'uuid' },
    {
      headerName: 'Id',
      autoHeight: true,
      cellStyle: {'line-height': "26px"},
      cellRenderer: function(params){
        return utils.getPatientIdentifiers(params.data);
      },
      getQuickFilterText: function(params) {
        return utils.getPatientIdentifiers(params.data);
      }
    },
    { headerName: 'Given Name', field: 'name.givenName' },
    { headerName: 'Family Name', field: 'name.familyName' },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Age', field: 'age' },
    { headerName: 'Village', field: 'address.village' },
    { headerName: 'Actions', field: 'actions' },
    { headerName: 'Checked-in Time',
      valueGetter: function getCheckedInTime(params) {
        return utils.getPatientCheckedInTime(params.data);
      }
    },
    { headerName: 'Check-out Time',
      valueGetter: function getCheckOutTime(params) {
        return utils.getPatientCheckOutTime(params.data);
      }
    }
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
      <List
        columnDefs={columnDefs}
        fetchListActionCreator={fetchListActionCreator}
        onMountOtherActionCreators={onMountOtherActionCreators}
        rowData={props.rowData}
        onRowCount={props.onRowCount}
        rowSelectedActionCreators={rowSelectedActionCreators}
        title=""
        optionalFilters={ PATIENT_IDENTIFIER_FILTERS }
      />
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


