import React from "react";
import { connect } from "react-redux";
import {selectors} from '@openmrs/react-components';
import CheckinForm from './CheckInForm';
import checkInActions from './checkInActions';
import {ENCOUNTER_TYPES, VISIT_TYPES, LOCATION_TYPES, CONCEPTS} from '../constants';
import { push } from "connected-react-router";
import {actions as toastrActions} from "react-redux-toastr";

class CheckInPage extends React.Component {

  constructor(props) {
    super(props);

    this.formSubmittedActionCreators = [
      () => toastrActions.add({ title: "Check-in completed for "
        + this.props.patient.name.givenName + " "
        + this.props.patient.name.familyName, type: "success" })
    ];
    this.formSubmittedActionCreators.push(() => push({
      pathname: '/checkin/checkInPage',
      state: {
        queueLink: '/checkin/checkInTabs'
      }
    }));
  }

  handleCheckIn(values) {
    let referralObs = [];
    if ( values !== null && (typeof values.referral !== 'undefined') && (values.referral.length > 0) ) {
      referralObs.push({ concept: CONCEPTS.SOURCE_OF_REFERRAL.uuid, value: values.referral });

    }
    this.props.dispatch(
      checkInActions.checkInSubmitted(
        this.props.patient,
        VISIT_TYPES.ClinicVisitType,
        ENCOUNTER_TYPES.CheckInEncounterType,
        referralObs,
        this.props.location,
        this.formSubmittedActionCreators
      ));
  }

  render() {
    return (
      <div>
        <CheckinForm
          patient={ this.props.patient }
          backLink={ "/checkin/checkInTabs" }
          onSubmit={ this.handleCheckIn.bind(this) }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let storePatient = selectors.getSelectedPatientFromStore(state);
  return {
    patient: storePatient,
    location: state.openmrs.session.sessionLocation ? state.openmrs.session.sessionLocation.uuid : LOCATION_TYPES.UnknownLocation,
  };
};

export default connect(mapStateToProps)(CheckInPage);
