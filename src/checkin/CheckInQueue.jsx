import React from 'react';
import { Label } from 'react-bootstrap';
import { patientSearchActions, DataGrid } from '@openmrs/react-components';
import { push } from "connected-react-router";
import { connect } from "react-redux";
import patientActions from '../patient/patientActions';

class CheckInQueue extends React.Component {

  constructor(props) {
    super(props);
    this.columnDefs =  [
      { headerName: 'patientUuid', hide: true, valueGetter: 'data.uuid' },
      { headerName: 'ID', valueGetter: 'data.identifier' },
      { headerName: 'First Name', valueGetter: 'data.firstName' },
      { headerName: 'Last Name', valueGetter: 'data.lastName' },
      { headerName: 'Gender', field: 'gender' },
      { headerName: 'Age', field: 'age' }
    ];

  }

  parseResults(results) {
    let patients = [];
    for (const item of results) {
      let patient = {
        uuid: item.uuid,
        id: item.id,
        firstName: item.person.names[0].givenName,
        lastName: item.person.names[0].familyName,
        gender: item.person.gender,
        age: item.person.age,
        identifier: item.identifiers[0].identifier,
        checkedInTime: null,
        birthdate: item.person.birthdate
      };
      patients.push(patient);
    }
    return patients;
  };

  redirectToCheckinPageActionCreator() {
    return push('/checkin/checkinPage');
  }

  componentDidMount() {
    this.props.dispatch(patientActions.clearPatientSelected());
    this.props.dispatch(patientSearchActions.patientSearch(
      'Foster',
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
  representation: "custom:(uuid,id,display,identifiers:(uuid,identifier,identifierType:(uuid),preferred),person:(uuid,display,gender,age,birthdate,birthdateEstimated,dead,deathDate,causeOfDeath,names,addresses,attributes))"
};

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    rowData: state.openmrs.patientSearch.results
  };
};

export default connect(mapStateToProps)(CheckInQueue);
