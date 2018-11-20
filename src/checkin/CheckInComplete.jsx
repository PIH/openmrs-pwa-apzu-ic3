import React from "react";
import { connect } from "react-redux";
import { Label, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import {selectors} from '@openmrs/react-components';
import CompletedScreenings from "../screening/CompletedScreenings";
import patientActions from "../patient/patientActions";
import utils from "../utils";


class CheckInComplete extends React.Component {

  componentDidMount() {
    this.props.dispatch(patientActions.getIC3Patients(
      (this.props.session.sessionLocation ? this.props.session.sessionLocation.uuid : null, utils.formatReportRestDate(new Date()))
    ));
  }

  render() {
    return (
      <div>
        <Link to='/checkin/checkInTabs'>
          <Button bsSize='large' bsStyle='danger'>
            Back to Queue
          </Button>
        </Link>
        <h3><Label>Completed Screenings</Label></h3>
        <CompletedScreenings/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
    session: state.openmrs.session,
  };
};

export default connect(mapStateToProps)(CheckInComplete);
