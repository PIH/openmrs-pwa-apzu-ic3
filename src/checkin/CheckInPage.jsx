import React from "react";
import { connect } from "react-redux";
import CheckinForm from './CheckInForm';
import checkInActions from './checkInActions';
import { ENCOUNTER_TYPES, VISIT_TYPES, LOCATION_TYPES } from '../constants';
import { push } from "connected-react-router";

class CheckInPage extends React.Component {

  redirectToQueuePageActionCreator() {
    return push('/checkin/checkInComplete');
  }

  handleCheckIn(values) {
    this.props.dispatch(
      checkInActions.checkInSubmitted(
        this.props.patient,
        VISIT_TYPES.ClinicVisitType,
        ENCOUNTER_TYPES.CheckInEncounterType,
        LOCATION_TYPES.UnknownLocation,
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
    patient: state.selected.patient
  };
};

export default connect(mapStateToProps)(CheckInPage);
