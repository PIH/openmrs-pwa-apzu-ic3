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
import moment from 'moment';
import { PATIENT_IDENTIFIER_FILTERS } from "../gridConstants";
import utils from "../utils";
import ic3PatientActions from "../patient/patientActions";

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

  const patientCard = (patient, index, onRowSelected) => (
    <div 
      className="card-list"
      key={index} 
      onClick={() => onRowSelected(patient)}>
      <div className="left-items">
        <span className="name">
          <span className="given-name">{patient.name && patient.name.givenName && patient.name.givenName}</span>
          <span className="family-name">{patient.name && patient.name.familyName && patient.name.familyName}</span>
        </span>
        <span className="gender-age">
          <span className="gender">{patient.gender && patient.gender === 'M' ? "Male" : "Female"}</span>
          <span className="age">{patient.age && patient.age} yrs old</span>
          <span className="dob">({patient.birthdate && moment(patient.birthdate).format('DD, MMM, YYYY')})</span>
        </span>
      </div>
      <div className="right-items">
        {utils.getPatientIdentifiers(patient) && utils.getPatientIdentifiers(patient).split('<br/>').map((identifier, index) => (
          <span key={index}>{identifier}</span>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <CardList
        fetchListActionCreator={fetchListActionCreator}
        filters={[...props.filters, patientObjByEncounterTypeFilter(ENCOUNTER_TYPES.CheckInEncounterType.uuid, 'include')]}
        loading={props.updating}
        card={patientCard}
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
