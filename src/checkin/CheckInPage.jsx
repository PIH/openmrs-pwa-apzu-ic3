import React from "react";
import { connect } from "react-redux";
import { CheckinForm, patientActions } from '@openmrs/react-components';
import { ENCOUNTER_TYPES, VISIT_TYPES, LOCATION_TYPES } from '../constants'
import { push } from "connected-react-router";

class CheckInPage extends React.Component {

  redirectToQueuePageActionCreator() {
    return push('/checkin/checkinQueue');
  }

  handleCheckIn(values) {
    this.props.dispatch(
      patientActions.checkInSubmitted(
        values,
        this.props.patient,
        VISIT_TYPES.ClinicVisitType,
        ENCOUNTER_TYPES.CheckInEncounterType,
        LOCATION_TYPES.NenoDistrictHospital,
        this.redirectToQueuePageActionCreator
      ));
  }

  render() {
    return (
      <div style={{ padding: 15 }}>
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
    dispatch: state.dispatch,
    patient: state.selected.patient
  };
};

export default connect(mapStateToProps)(CheckInPage);
