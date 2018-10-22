import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import ScreeningQueue from "../ScreeningQueue";
import htcFilters from './htcFilters';
import utils from "../../utils";

let HtcQueue = props => {

  const rowSelectedActionCreators = [
    () => push('/screening/htc/page')
  ];

  const columnDefs = [
    { headerName: 'uuid', hide: true, field: 'uuid' },
    {
      headerName: 'Id',
      autoHeight: true,
      cellRenderer: function(params){
        return utils.getPatientIdentifiers(params.data);
      }
    },
    { headerName: 'Given Name', field: 'name.givenName' },
    { headerName: 'Family Name', field: 'name.familyName' },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Age', field: 'age' },
    { headerName: 'Village', field: 'address.village' },
    { headerName: 'Actions', field: 'actions' },
    { headerName: 'Alert', field: 'alert' },
    { headerName: 'Checked-in Time', valueGetter: function getCheckedInTime(params) {
        return utils.getPatientCheckedInTime(params.data);
      }
    }
  ];

  return (
    <div>
      <ScreeningQueue
        dispatch={ props.dispatch }
        columnDefs = { columnDefs }
        filters={ htcFilters.required }
        rowData={ Object.values(props.patients) }
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="HTC Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: state.openmrs.patients,
  };
};

export default connect(mapStateToProps)(HtcQueue);
