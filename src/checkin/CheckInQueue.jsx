import React from 'react';
import { Label } from 'react-bootstrap';
import { patientSearchActions, DataGrid, Patient } from '@openmrs/react-components';
import { push } from "connected-react-router";
import { connect } from "react-redux";
import patientActions from '../patient/patientActions';
import { PATIENT_REPRESENTATION } from '../constants';
import utils from "../utils";

class CheckInQueue extends React.Component {

  constructor(props) {
    super(props);
    this.columnDefs =  [
      { headerName: 'uuid', hide: true, field: 'uuid' },
      { headerName: 'patientId', field: 'id' },
      { headerName: 'Given Name', field: 'name.givenName' },
      { headerName: 'Family Name', field: 'name.familyName' },
      { headerName: 'Gender', field: 'gender' },
      { headerName: 'Age', field: 'age' },
      { headerName: 'Checked-in Time', valueGetter: function getCheckedInTime(params) {
          return utils.getPatientCheckedInTime(params.data);
        }
      }
    ];

  }

  parseResults(results) {
    // convert results to the patient domain object
    return results.map((result) => {
      return Patient.createFromRestRep(result);
    });
  };

  redirectToCheckinPageActionCreator() {
    return push('/checkin/checkInPage');
  }

  componentDidMount() {
    this.props.dispatch(patientActions.clearPatientSelected());
    this.props.dispatch(patientSearchActions.patientSearch(
      'Bob',
      this.parseResults.bind(this),
      this.props.representation));
  }

  render() {
    return (
      <div>
        <h3><Label>Check In Queue</Label></h3>
        <DataGrid
          columnDefs={this.columnDefs}
          rowData={this.props.rowData}
          rowSelectedActionCreators={[this.redirectToCheckinPageActionCreator]}
        />
      </div>
    );
  }
}

CheckInQueue.defaultProps = {
  representation: "custom:" + PATIENT_REPRESENTATION
};

const mapStateToProps = (state) => {
  return {
    rowData: state.openmrs.patientSearch.results
  };
};

export default connect(mapStateToProps)(CheckInQueue);
