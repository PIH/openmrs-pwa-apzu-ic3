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

let ScreeningQueue = props => {

  const fetchListActionCreator = props.fetchListActionCreator ? props.fetchListActionCreator :
    () => {
      if (!props.updating) {
        props.dispatch(ic3PatientActions.getIC3Patients(
          props.session.sessionLocation ? props.session.sessionLocation.uuid : null, utils.formatReportRestDate(new Date())
        ));
      }
    };

  const onMountOtherActionCreators = props.onMountOtherActionCreators ? props.onMountOtherActionCreators :
    [
      () => props.dispatch(patientActions.clearSelectedPatient())
    ];

  return (
    <div>
      <CardList
        AdditionalFilters={IdentifierFilters}
        card={PatientCard}
        delayInterval={0}
        dispatch={props.dispatch}
        fetchListActionCreator={fetchListActionCreator}
        filters={[...props.filters, patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.CheckInEncounterType.uuid, 'include')]}
        getPatientIdentifiers={utils.getPatientIdentifiers}
        loading={props.updating}
        onMountOtherActionCreators={onMountOtherActionCreators}
        rowData={props.rowData}
        rowSelectedActionCreators={[patientActions.setSelectedPatient, ...props.rowSelectedActionCreators]}
        searchFilterFields={['name.givenName', 'name.familyName', 'identifiers.0.identifier', 'identifiers.1.identifier', 'identifiers.2.identifier']}
        sortFields={['name.givenName', 'name.familyName']}
        title={props.title}
      />
    </div>
  );
};

ScreeningQueue.propTypes = {
  dispatch: PropTypes.func.isRequired,
  filters: PropTypes.array,
  rowData: PropTypes.array.isRequired,
  rowSelectedActionCreators: PropTypes.array,
  title: PropTypes.string.isRequired
};

ScreeningQueue.defaultProps = {
  filters: []
};

const mapStateToProps = (state) => {
  return {
    session: state.openmrs.session,
    updating: selectors.isPatientStoreUpdating(state)
  };
};

export default connect(mapStateToProps)(ScreeningQueue);
