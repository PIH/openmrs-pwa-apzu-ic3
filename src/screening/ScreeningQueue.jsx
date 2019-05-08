import React from "react";
import PropTypes from 'prop-types';
import {
  patientActions,
  CardList,
  patientObjByEncounterTypeFilter,
  selectors,
  PatientCard,
} from '@openmrs/react-components';
import { ENCOUNTER_TYPES } from '../constants';
import { connect } from "react-redux";
import utils from "../utils";
import ic3PatientActions from "../patient/patientActions";
import IdentifierFilters from './IdentifierFilters';
import screeningActions from './actions/actions';

let ScreeningQueue = props => {

  const fetchListActionCreator = props.fetchListActionCreator ? props.fetchListActionCreator :
    () => {
      if (!props.updating) {
        props.dispatch(ic3PatientActions.getIC3Patients(
          props.session.sessionLocation ? props.session.sessionLocation.uuid : null, null  // endDate null means use "today"
        ));
      }
    };

  const onMountOtherActionCreators = props.onMountOtherActionCreators ? props.onMountOtherActionCreators :
    [
      () => props.dispatch(patientActions.clearSelectedPatient())
    ];

  let filters = props.excludeCheckedInPatients ? [patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.CheckInEncounterType.uuid, 'include')] : [];

  return (
    <div>
      <CardList
        AdditionalSearchFilters={IdentifierFilters}
        additionalSearchFilterFields={[(patient) => patient.identifiers ? patient.identifiers.map(i => i.identifier) : null]}
        card={PatientCard}
        delayInterval={0}
        dispatch={props.dispatch}
        fetchListActionCreator={fetchListActionCreator}
        filters={[...props.filters, ...filters]}
        getPatientIdentifiers={utils.getPatientIdentifiers}
        loading={props.updating}
        noDataMessage="No patients to display"
        onMountOtherActionCreators={onMountOtherActionCreators}
        rowData={props.rowData}
        rowSelectedActionCreators={[patientActions.setSelectedPatient, () => screeningActions.setLastScreeningQueue(props.location), ...props.rowSelectedActionCreators]}
        searchFilterFields={['name.fullName', 'name.reverseFullName']}
        sortFields={['name.givenName', 'name.familyName']}
        title={props.title}
      />
    </div>
  );
};

ScreeningQueue.propTypes = {
  dispatch: PropTypes.func.isRequired,
  excludeCheckedInPatients: PropTypes.bool.isRequired,
  filters: PropTypes.array,
  rowData: PropTypes.array.isRequired,
  rowSelectedActionCreators: PropTypes.array,
  title: PropTypes.string.isRequired
};

ScreeningQueue.defaultProps = {
  filters: [],
  excludeCheckedInPatients: true
};

const mapStateToProps = (state) => {
  return {
    session: state.openmrs.session,
    updating: selectors.isPatientStoreUpdating(state),
    location: state.router.location.pathname
  };
};

export default connect(mapStateToProps)(ScreeningQueue);
