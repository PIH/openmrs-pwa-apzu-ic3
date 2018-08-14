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
    { headerName: 'Id', valueGetter: 'data.identifiers[0].identifier' },  // TODO needs to be replaced with actual preferred identifier
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
    () => props.dispatch(visitActions.fetchActiveVisits("custom:" + VISIT_REPRESENTATION, props.session.sessionLocation.uuid));

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
        rowData={Array.from(props.patients.values())}
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


