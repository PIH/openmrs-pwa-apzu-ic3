import React from "react";
import PropTypes from 'prop-types';
import { visitActions, List } from '@openmrs/react-components';
import patientActions from '../patient/patientActions';
import utils from "../utils";
import { VISIT_REPRESENTATION } from '../constants';
import {connect} from "react-redux";

let ScreeningQueue = props => {

  const fetchListActionCreator = props.fetchListActionCreator ? this.props.fetchListActionCreator :
    () => props.dispatch(visitActions.fetchActiveVisits("custom:" + VISIT_REPRESENTATION, props.session.sessionLocation.uuid));

  const onMountOtherActionCreators = props.onMountOtherActionCreators ? this.props.onMountOtherActionCreators :
    [
      () => props.dispatch(patientActions.clearPatientSelected())
    ];

  return (
    <div>
      <List
        columnDefs={props.columnDefs}
        fetchListActionCreator={fetchListActionCreator}
        onMountOtherActionCreators={onMountOtherActionCreators}
        rowData={props.rowData}
        rowSelectedActionCreators={props.rowSelectedActionCreators}
        title={props.title}
      />
    </div>
  );
};

ScreeningQueue.propTypes = {
  columnDefs: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  rowData: PropTypes.array.isRequired,
  rowSelectedActionCreators: PropTypes.array,
  title: PropTypes.string.isRequired
};

ScreeningQueue.defaultProps = {
  columnDefs: [
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
  ]
};

const mapStateToProps = (state) => {
  return {
    session: state.openmrs.session,
  };
};

export default connect(mapStateToProps)(ScreeningQueue);
