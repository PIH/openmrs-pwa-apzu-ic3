import React from 'react';
import { Patient, PatientSearch } from '@openmrs/react-components';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';


class SearchPatient extends React.Component {

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

  redirectToInfoPageActionCreator() {
    return push('/infoPatient');
  }

  parseResults(results) {
    // convert results to the patient domain object
    return results.map((result) => {
      return Patient.createFromRestRep(result);
    });
  };

  render() {
    return (
      <div>
        <PatientSearch
          columnDefs={this.columnDefs}
          parseResults={this.parseResults.bind(this)}
          rowSelectedActionCreators={[this.redirectToInfoPageActionCreator]}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    patient: state.selected.patient
  };
};

export default connect(mapStateToProps)(SearchPatient);
