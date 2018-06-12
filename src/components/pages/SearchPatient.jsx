import React from 'react';
import { PatientSearch } from '@openmrs/react-components';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

class SearchPatient extends React.Component {

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


    renderInfoPage = () => {
      if (this.props.patient)  {
        return <Redirect to='/infoPatient' />;
      }
    };

    render() {
      return (
        <div>
          {this.renderInfoPage()}
          <PatientSearch
            columnDefs={this.columnDefs}
            parseResults={this.parseResults.bind(this)}
          />
        </div>
      );
    }
};

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    patient: state.selected.patient
  };
};

export default connect(mapStateToProps)(SearchPatient);
