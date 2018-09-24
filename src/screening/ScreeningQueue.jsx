import React from "react";
import PropTypes from 'prop-types';
import {patientActions, visitActions, List, patientObjByEncounterTypeFilter} from '@openmrs/react-components';
import utils from "../utils";
import {ENCOUNTER_TYPES} from '../constants';
import {connect} from "react-redux";

let ScreeningQueue = props => {

  const fetchListActionCreator = props.fetchListActionCreator ? this.props.fetchListActionCreator :
    () => props.dispatch(visitActions.fetchActiveVisits(
      (props.session.sessionLocation ? props.session.sessionLocation.uuid : null)
    ));

  const onMountOtherActionCreators = props.onMountOtherActionCreators ? this.props.onMountOtherActionCreators :
    [
      () => props.dispatch(patientActions.clearSelectedPatient())
    ];

  return (
    <div>
      <List
        columnDefs={props.columnDefs}
        fetchListActionCreator={fetchListActionCreator}
        filters={[...props.filters, patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.CheckInEncounterType.uuid, 'include')]}
        onMountOtherActionCreators={onMountOtherActionCreators}
        rowData={props.rowData}
        onRowCount={ props.onRowCount }
        rowSelectedActionCreators={[...props.rowSelectedActionCreators, patientActions.setSelectedPatient]}
        title={props.title}
      />
    </div>
  );
};

ScreeningQueue.propTypes = {
  columnDefs: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  filters: PropTypes.array,
  rowData: PropTypes.array.isRequired,
  rowSelectedActionCreators: PropTypes.array,
  title: PropTypes.string.isRequired
};

ScreeningQueue.defaultProps = {
  columnDefs: [
    { headerName: 'uuid', hide: true, field: 'uuid' },
    {
      headerName: 'Id',
      autoHeight: true,
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
    { headerName: 'Appt Date', valueGetter: function getApptDate(params) {
        if (params.data.lastAppointmentDate) {
          return utils.formatReportRestDate(params.data.lastAppointmentDate);
        }
      }
    },
    { headerName: 'Checked-in Time',
      valueGetter: function getCheckedInTime(params) {
        return utils.getPatientCheckedInTime(params.data);
      }
    },
  ],
  filters: []
};

const mapStateToProps = (state) => {
  return {
    session: state.openmrs.session,
  };
};

export default connect(mapStateToProps)(ScreeningQueue);
