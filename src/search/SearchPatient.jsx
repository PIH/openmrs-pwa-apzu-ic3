import React from 'react';
import { connect } from "react-redux";
import { PatientSearch } from '@openmrs/react-components';
import { push } from 'connected-react-router';
import IdentifierFilters from '../screening/IdentifierFilters';
import utils from '../utils';
import screeningActions from '../screening/actions/actions';


let SearchPatient = (props) => {

  // we "cache" the search results only if we get here via a "PUSH" action, which seems to be only when clicking a BACK
  // bit of a hack, we should explore further

  return (
    <div>
      <PatientSearch
        AdditionalFilters={IdentifierFilters}
        cacheSearchResults={props.action === 'PUSH'}
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
    location: state.router.location.pathname,
    action: state.router.action
  };
};

export default connect(mapStateToProps)(SearchPatient);
