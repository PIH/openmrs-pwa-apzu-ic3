import React from 'react';
import { visitActions } from '@openmrs/react-components';
import { DataGrid } from '@openmrs/react-components';

class Queue extends React.Component {

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

  // TODO make this potentially come from props so we can override it?
  componentDidMount() {
    this.props.dispatch(visitActions.fetchActiveVisits("custom:(patient:default,encounters:default)"));
    this.interval = setInterval(() =>
      this.props.dispatch(visitActions.fetchActiveVisits("custom:(patient:default,encounters:default)")), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <DataGrid
          columnDefs={this.columnDefs}
          rowData={this.props.rowData}
        />
      </div>
    );
  }

}

export default Queue;
