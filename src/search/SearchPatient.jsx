import React from 'react';
import { PatientSearch } from '@openmrs/react-components';
import { push } from 'connected-react-router';
import patientApptActions from '../patient/patientApptActions';


let SearchPatient = (props) => {
  return (
    <div>
      <h3>Search for Patient</h3>
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
