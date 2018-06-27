import React from 'react';
import { push } from 'connected-react-router';
import { visitActions } from '@openmrs/react-components';
import { DataGrid } from '@openmrs/react-components';

class Queue extends React.Component {

  constructor(props) {
    super(props);
    this.columnDefs =  [
      { headerName: 'uuid', hide: true, field: 'uuid' },
     /* { headerName: 'ID', valueGetter: 'data.identifier' },*/
      { headerName: 'Given Name', field: 'name.givenName' },
      { headerName: 'Family Name', field: 'name.familyName' },
      { headerName: 'Gender', field: 'gender' },
      { headerName: 'Age', field: 'age' }
    ];
  }

  // TODO make this potentially come from props so we can override it?
  componentDidMount() {
    this.props.dispatch(visitActions.fetchActiveVisits("custom:(uuid,patient:full,encounters:default)"));
    this.interval = setInterval(() =>
      this.props.dispatch(visitActions.fetchActiveVisits("custom:(uuid,patient:full,encounters:default)")), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  redirectToInfoPageActionCreator() {
    return push('/'); // needs to be overwritten in implementing methods
  }

  render() {
    return (
      <div>
        <DataGrid
          columnDefs={this.columnDefs}
          rowData={this.props.rowData}
          rowSelectedActionCreators={[this.redirectToInfoPageActionCreator]}
        />
      </div>
    );
  }

}

export default Queue;
