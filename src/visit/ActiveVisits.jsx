import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import {visitActions, patientActions, List} from '@openmrs/react-components';
import utils from "../utils";
import actionVisitFilters from './activeVisitsFilters';

// TODO: should this extend the ScreeningQueue?

let ActiveVisits = props => {

  const columnDefs = [
    { headerName: 'uuid', hide: true, field: 'uuid' },
    { headerName: 'ART', valueGetter: function getArtIdentifier(params) { return utils.getPatientArtIdentifier(params.data); }},
    { headerName: 'EID', valueGetter: function getEidIdentifier(params) { return utils.getPatientEidIdentifier(params.data); }},
    { headerName: 'NCD', valueGetter: function getNcdIdentifier(params) { return utils.getPatientNcdIdentifier(params.data); }},
    { headerName: 'Given Name', field: 'name.givenName' },
    { headerName: 'Family Name', field: 'name.familyName' },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Age', field: 'age' },
    { headerName: 'Checked-in Time',
      valueGetter: function getCheckedInTime(params) {
        return utils.getPatientCheckedInTime(params.data);
      }
    }
  ];

  const fetchListActionCreator =
    () => props.dispatch(visitActions.fetchActiveVisits(
      props.session.sessionLocation ? props.session.sessionLocation.uuid : null));

  const onMountOtherActionCreators = [
    () => props.dispatch(patientActions.clearSelectedPatient())
  ];

  const rowSelectedActionCreators = [
    patientActions.setSelectedPatient,
    () =>  push({
      pathname: '/checkin/checkInComplete',
      state: {
        queueLink: '/visit/queue'
      }
    }),
  ];

  return (
    <div>
      <List
        columnDefs={columnDefs}
        fetchListActionCreator={fetchListActionCreator}
        filters={actionVisitFilters}
        onMountOtherActionCreators={onMountOtherActionCreators}
        rowData={Object.values(props.patients)}
        onRowCount={ props.onRowCount }
        rowSelectedActionCreators={rowSelectedActionCreators}
        title=""
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: state.openmrs.patients,
    session: state.openmrs.session
  };
};

export default connect(mapStateToProps)(ActiveVisits);


