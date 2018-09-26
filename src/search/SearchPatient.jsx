import React from 'react';
import { Label } from 'react-bootstrap';
import {PatientSearch} from '@openmrs/react-components';
import { push } from 'connected-react-router';
import patientApptActions from '../patient/patientApptActions';


let SearchPatient = (props) => {
  return (
    <div>
      <h3><Label>Patient Search</Label></h3>
      <PatientSearch
        rowSelectedActionCreators={[
          patientApptActions.getPatientApptData,
          () => push('/checkin/checkInPage')
        ]}
      />
    </div>
  );
};

export default SearchPatient;
