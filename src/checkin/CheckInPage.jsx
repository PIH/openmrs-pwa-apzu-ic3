import React from "react";
import { connect } from "react-redux";
import CheckinForm from './CheckInForm';
import checkInActions from './checkInActions';
import { visitActions } from '@openmrs/react-components';
import {ENCOUNTER_TYPES, VISIT_TYPES, LOCATION_TYPES, VISIT_REPRESENTATION} from '../constants';
import { push } from "connected-react-router";

class CheckInPage extends React.Component {

  componentDidMount() {
    this.props.dispatch(visitActions.fetchPatientActiveVisit(this.props.patient.uuid,
      "custom:" + VISIT_REPRESENTATION));
  }

  redirectToQueuePageActionCreator() {
    return push({
      pathname: '/checkin/checkInComplete',
      state: {
        queueLink: '/checkin/checkInQueue'
      }
    });
  }

  handleCheckIn(values) {
    this.props.dispatch(
      checkInActions.checkInSubmitted(
        this.props.patient,
        VISIT_TYPES.ClinicVisitType,
        ENCOUNTER_TYPES.CheckInEncounterType,
        this.props.location,
        this.redirectToQueuePageActionCreator
      ));
  }

  render() {
    return (
      <div>
        <CheckinForm
          patient={ this.props.patient }
          onSubmit={ this.handleCheckIn.bind(this) }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    patient: state.selectedPatient ? state.patients[state.selectedPatient] : null,
    location: state.openmrs.session.sessionLocation ? state.openmrs.session.sessionLocation.uuid : LOCATION_TYPES.UnknownLocation
  };
};

export default connect(mapStateToProps)(CheckInPage);
