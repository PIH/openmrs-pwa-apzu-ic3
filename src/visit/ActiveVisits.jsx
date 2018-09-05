import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import { visitActions, List } from '@openmrs/react-components';
import patientActions from '../patient/patientActions';
import utils from "../utils";
import { VISIT_REPRESENTATION } from '../constants';
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
    () => props.dispatch(visitActions.fetchActiveVisits("custom:" + VISIT_REPRESENTATION,
      props.session.sessionLocation ? props.session.sessionLocation.uuid : null));

  const onMountOtherActionCreators = [
    () => props.dispatch(patientActions.clearPatientSelected())
  ];

  const rowSelectedActionCreators = [
    () =>  push({
      pathname: '/checkin/checkInComplete',
      state: {
        queueLink: '/visit/queue'
      }
    })
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
    patients: state.patients,
    session: state.openmrs.session
  };
};

export default connect(mapStateToProps)(ActiveVisits);


