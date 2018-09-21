import React from 'react';
import { Label } from 'react-bootstrap';
import {patientUtil, PatientSearch, patientActions} from '@openmrs/react-components';
import { push } from 'connected-react-router';
import {connect} from "react-redux";
import patientApptActions from '../patient/patientApptActions';


class SearchPatient extends React.Component {

  constructor(props) {
    super(props);

    this.columnDefs =  [
      { headerName: 'uuid', hide: true, field: 'uuid' },
      { headerName: 'Id', valueGetter: 'data.identifiers[0].identifier' },
      { headerName: 'Given Name', field: 'name.givenName' },
      { headerName: 'Family Name', field: 'name.familyName' },
      { headerName: 'Gender', field: 'gender' },
      { headerName: 'Age', field: 'age' }
    ];
  }

  componentDidMount() {
    this.props.dispatch(patientActions.clearSelectedPatient());
  }

  parseResults(results) {
    // convert results to the patient domain object
    return results.map((result) => {
      return patientUtil.createFromRestRep(result);
    });
  };

  render() {
    return (
      <div>
        <h3><Label>Patient Search</Label></h3>
        <PatientSearch
          columnDefs={this.columnDefs}
          parseResults={this.parseResults.bind(this)}
          rowSelectedActionCreators={[
            patientActions.addPatientToStore,
            patientApptActions.getPatientApptData,
            () => push('/checkin/checkInPage')
          ]}
        />
      </div>
    );
  }
}

export default connect()(SearchPatient);
