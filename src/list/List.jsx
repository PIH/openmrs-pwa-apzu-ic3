import React from 'react';
import { push } from 'connected-react-router';
import { Label } from 'react-bootstrap';
import { visitActions } from '@openmrs/react-components';
import { DataGrid } from '@openmrs/react-components';
import patientActions from '../patient/patientActions';
import { PATIENT_REPRESENTATION, ENCOUNTER_REPRESENTATION } from '../constants';
import utils from "../utils";

class List extends React.Component {

  constructor(props) {
    super(props);

    // TOODO: allow this to be passed in as a prop

    this.columnDefs =  [
      { headerName: 'uuid', hide: true, field: 'uuid' },
      { headerName: 'Id', valueGetter: 'data.identifiers[0].identifier' },
      { headerName: 'patientId', field: 'id' },
      { headerName: 'Given Name', field: 'name.givenName' },
      { headerName: 'Family Name', field: 'name.familyName' },
      { headerName: 'Gender', field: 'gender' },
      { headerName: 'Age', field: 'age' },
      {
        headerName: 'Checked-in Time', valueGetter: function getCheckedInTime(params) {
          return utils.getPatientCheckedInTime(params.data);
        }
      }
    ];
  }

  componentDidMount() {
    this.props.dispatch(patientActions.clearPatientSelected());
    // TODO make this potentially come from props so we can override it?
    // TODO can we get away from having to get a "full" rep of a patient?
    this.props.dispatch(this.fetchListAction());
    this.interval = setInterval(() =>
      this.props.dispatch(this.fetchListAction()), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchListAction() {
    return visitActions.fetchActiveVisits("custom:(uuid,patient:" + PATIENT_REPRESENTATION + ",encounters:" + ENCOUNTER_REPRESENTATION + ")");
  }

  redirectToInfoPageActionCreator() {
    return push('/'); // needs to be overwritten in implementing methods
  }

  title() {
    return "List";
  }

  render() {
    return (
      <div>
        <h3><Label>{this.title()}</Label></h3>
        <DataGrid
          columnDefs={this.columnDefs}
          rowData={this.props.rowData}
          rowSelectedActionCreators={[this.redirectToInfoPageActionCreator]}
        />
      </div>
    );
  }

}

export default List;
