import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import { visitActions, List } from '@openmrs/react-components';
import patientActions from '../patient/patientActions';
import utils from "../utils";
import { PATIENT_REPRESENTATION, ENCOUNTER_REPRESENTATION } from '../constants';

// TODO: should this extend the ScreeningQueue?

let ActiveVisits = props => {

  const columnDefs = [
    { headerName: 'uuid', hide: true, field: 'uuid' },
    { headerName: 'Id', valueGetter: 'data.identifiers[0].identifier' },  // TODO needs to be replaced with actual preferred identifier
    { headerName: 'patientId', field: 'id' },
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
    () => props.dispatch(visitActions.fetchActiveVisits("custom:(uuid,patient:" + PATIENT_REPRESENTATION + ",encounters:" + ENCOUNTER_REPRESENTATION + ")"));

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
        onMountOtherActionCreators={onMountOtherActionCreators}
        rowData={props.rowData}
        rowSelectedActionCreators={rowSelectedActionCreators}
        title=""
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    rowData: state.activeVisits,
  };
};

export default connect(mapStateToProps)(ActiveVisits);


