import React from 'react';
import { PatientSearch } from '@openmrs/react-components';
import { push } from 'connected-react-router';
import IdentifierFilters from '../screening/IdentifierFilters';
import utils from '../utils';


let SearchPatient = (props) => {
  return (
    <div>
      <PatientSearch
        AdditionalFilters={IdentifierFilters}
        rowSelectedActionCreators={[
          () => push('/screening')
        ]}
        getPatientIdentifiers={utils.getPatientIdentifiers}
        title="Search for Patient"
      />
    </div>
  );
};

export default SearchPatient;
