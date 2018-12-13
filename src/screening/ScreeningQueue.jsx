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
import { PATIENT_IDENTIFIER_FILTERS } from "../gridConstants";
import utils from "../utils";
import ic3PatientActions from "../patient/patientActions";
import ScreeningFilters from './ScreeningFilters';

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
        card={PatientCard}
        /*
        * Calling this cardListFilters till we decide 
        * what happens to the already existing filter.
        */
        cardListFilters={ScreeningFilters}
        dispatch={props.dispatch}
        fetchListActionCreator={fetchListActionCreator}
        filters={[...props.filters, patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.CheckInEncounterType.uuid, 'include')]}
        getPatientIdentifiers={utils.getPatientIdentifiers}
        loading={props.updating}
        onMountOtherActionCreators={onMountOtherActionCreators}
        optionalFilters={PATIENT_IDENTIFIER_FILTERS}
        optionalFiltersType='or'
        rowData={props.rowData}
        rowSelectedActionCreators={[patientActions.setSelectedPatient, ...props.rowSelectedActionCreators]}
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
