import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import ScreeningQueue from "../ScreeningQueue";
import htcFilters from './htcFilters';
import utils from "../../utils";

let HtcQueue = props => {

  const rowSelectedActionCreators = [
    () => push('/screening/htc/omrsform')
  ];

  const columnDefs = [
    { headerName: 'uuid', hide: true, field: 'uuid' },
    { headerName: 'ART Number', field: 'identifiers.artNumber' },
    { headerName: 'EID Number', field: 'identifiers.eidNumber' },
    { headerName: 'NCD Number', field: 'identifiers.ncdNumber' },
    { headerName: 'Given Name', field: 'name.givenName' },
    { headerName: 'Family Name', field: 'name.familyName' },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Age', field: 'age' },
    { headerName: 'Village', field: 'village' },
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
    patients: state.patients,
  };
};

export default connect(mapStateToProps)(HtcQueue);
