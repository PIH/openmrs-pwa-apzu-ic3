import React from 'react';
import { connect } from "react-redux";
import { visitActions } from '@openmrs/react-components';
import { DataGrid } from '@openmrs/react-components';

class BloodPressureQueue extends React.Component {

  constructor(props) {
    super(props);
    this.columnDefs =  [
      { headerName: 'patientUuid', hide: true, field: 'uuid' },
//      { headerName: 'ID', valueGetter: 'data.identifier' },
      { headerName: 'Name', field: 'patient.person.preferredName.display' },
      { headerName: 'Gender', field: 'patient.person.gender' },
      { headerName: 'Age', field: 'patient.person.age' }
    ];
  }

  componentDidMount() {
    this.interval = setInterval(() =>
      this.props.dispatch(visitActions.fetchActiveVisits("custom:(patient:default,encounters:default)")), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return(
      <div>
        <DataGrid columnDefs={this.columnDefs} rowData={this.props.rowData}/>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    rowData: state.screening.bloodPressureQueue.results
  };
};

export default connect(mapStateToProps)(BloodPressureQueue);
