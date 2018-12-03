import React from "react";
import PropTypes from 'prop-types';
import {
  patientActions,
  CardList,
  patientObjByEncounterTypeFilter,
  selectors
} from '@openmrs/react-components';
import {ENCOUNTER_TYPES} from '../constants';
import { connect } from "react-redux";
import { BASIC_GRID, COLUMN_DEFS, PATIENT_IDENTIFIER_FILTERS } from "../gridConstants";
import utils from "../utils";
import ic3PatientActions from "../patient/patientActions";

let ScreeningQueue = props => {

  const fetchListActionCreator = props.fetchListActionCreator ? this.props.fetchListActionCreator :
    () => {
      if (!props.updating) {
        props.dispatch(ic3PatientActions.getIC3Patients(
          props.session.sessionLocation ? props.session.sessionLocation.uuid : null, utils.formatReportRestDate(new Date())
        ));
      }
    };

  const onMountOtherActionCreators = props.onMountOtherActionCreators ? this.props.onMountOtherActionCreators :
    [
      () => props.dispatch(patientActions.clearSelectedPatient())
    ];

  return (
    <div>
      <CardList
        fetchListActionCreator={fetchListActionCreator}
        filters={[...props.filters, patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.CheckInEncounterType.uuid, 'include')]}
        loading={props.updating}
        getIdentifiers={utils.getPatientIdentifiers}
        onMountOtherActionCreators={onMountOtherActionCreators}
        optionalFilters={ PATIENT_IDENTIFIER_FILTERS }
        optionalFiltersType='or'
        rowData={props.rowData}
        rowSelectedActionCreators={[patientActions.setSelectedPatient, ...props.rowSelectedActionCreators]}
        dispatch={props.dispatch}
        title={props.title}
      />
    </div>
  );
};

ScreeningQueue.propTypes = {
  columnDefs: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  filters: PropTypes.array,
  rowData: PropTypes.array.isRequired,
  rowSelectedActionCreators: PropTypes.array,
  title: PropTypes.string.isRequired
};

ScreeningQueue.defaultProps = {
  columnDefs: [
    ...BASIC_GRID,
    COLUMN_DEFS.CHECKED_IN_TIME
  ],
  filters: []
};

const mapStateToProps = (state) => {
  return {
    session: state.openmrs.session,
    updating: selectors.isPatientStoreUpdating(state)
  };
};

export default connect(mapStateToProps)(ScreeningQueue);
