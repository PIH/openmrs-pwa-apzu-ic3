import React from 'react';
import { connect } from "react-redux";
import { PatientSearch } from '@openmrs/react-components';
import { push } from 'connected-react-router';
import IdentifierFilters from '../screening/IdentifierFilters';
import utils from '../utils';
import screeningActions from '../screening/actions/actions';


let SearchPatient = (props) => {
  return (
    <div>
      <PatientSearch
        AdditionalFilters={IdentifierFilters}
        cacheSearchResults
        getPatientIdentifiers={utils.getPatientIdentifiers}
        rowSelectedActionCreators={[
          () => push('/screening'),
          () => screeningActions.setLastScreeningQueue(props.location),
        ]}
        title="Search for Patient"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    location: state.router.location.pathname
  };
};

export default connect(mapStateToProps)(SearchPatient);
