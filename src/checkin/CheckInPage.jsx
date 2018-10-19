import React from "react";
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';
import { Label } from 'react-bootstrap';
import { connect } from "react-redux";
import CheckinForm from './CheckInForm';
import checkInActions from './checkInActions';
import {ENCOUNTER_TYPES, VISIT_TYPES, LOCATION_TYPES, CONCEPTS} from '../constants';
import { push } from "connected-react-router";
import {actions as toastrActions} from "react-redux-toastr";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    label: 'Retrieving patient info'
`;

class CheckInPage extends React.Component {

  constructor(props) {
    super(props);

    this.formSubmittedActionCreators = [
      () => toastrActions.add({ title: "Patient Check-in", type: "success" })
    ];
    this.formSubmittedActionCreators.push(() => push({
      pathname: '/checkin/checkInComplete',
      state: {
        queueLink: '/checkin/checkInQueue'
      }
    }));
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
        { this.props.loading === true &&
        <div className='sweet-loading'>
          <Label bsStyle="info">Updating Patient Info</Label>
          <ClipLoader
            className={override}
            sizeUnit={"px"}
            size={50}
            color={'#F5A623'}
            loading={this.props.loading}
          />
        </div>
        }
        <CheckinForm
          patient={ this.props.patient }
          backLink={ "/checkin/checkInQueue" }
          onSubmit={ this.handleCheckIn.bind(this) }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let storePatient = state.openmrs.selectedPatient ? state.openmrs.patients[state.openmrs.selectedPatient] : null;
  return {
    patient: storePatient,
    location: state.openmrs.session.sessionLocation ? state.openmrs.session.sessionLocation.uuid : LOCATION_TYPES.UnknownLocation,
    loading: (storePatient && storePatient.lastVisitDate) ? false : true,
  };
};

export default connect(mapStateToProps)(CheckInPage);
