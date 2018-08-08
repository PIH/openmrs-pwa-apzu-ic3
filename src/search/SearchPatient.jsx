import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Patient, PatientSearch } from '@openmrs/react-components';
import { visitActions } from '@openmrs/react-components';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import patientActions from '../patient/patientActions';
import {ENCOUNTER_REPRESENTATION, PATIENT_REPRESENTATION} from "../constants";


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
    this.props.dispatch(visitActions.fetchActiveVisits("custom:(uuid,patient:" + PATIENT_REPRESENTATION + ",encounters:" + ENCOUNTER_REPRESENTATION + ")"));
    this.props.dispatch(patientActions.clearPatientSelected());
  }

  redirectToInfoPageActionCreator() {
    // console.log("SearchPatient.jsx before navigating to checkInPage: patient = " + this.props.patient.uuid);
    return push('/checkin/checkInPage');
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
        <Card>
          <CardContent>
            <Typography variant="title">Patient Search</Typography>
            <PatientSearch
              columnDefs={this.columnDefs}
              parseResults={this.parseResults.bind(this)}
              rowSelectedActionCreators={[this.redirectToInfoPageActionCreator]}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    patient: state.selectedPatient.patient.patient
  };
};

export default connect(mapStateToProps)(SearchPatient);
