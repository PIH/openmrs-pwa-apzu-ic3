import React from "react";
import { connect } from "react-redux";
import { Label, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import {visitActions} from '@openmrs/react-components';
import CompletedScreenings from "../screening/CompletedScreenings";

;

class CheckInComplete extends React.Component {

  componentDidMount() {
    this.props.dispatch(visitActions.fetchActiveVisits(
      (this.props.session.sessionLocation ? this.props.session.sessionLocation.uuid : null)
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
    patient: state.openmrs.selectedPatient ? state.openmrs.patients[state.openmrs.selectedPatient] : null,
    session: state.openmrs.session,
  };
};

export default connect(mapStateToProps)(CheckInComplete);
