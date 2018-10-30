import React from "react";
import { connect } from "react-redux";
import { Label, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import {visitActions, selectors} from '@openmrs/react-components';
import CompletedScreenings from "../screening/CompletedScreenings";
import {ACTIVE_VISITS_REP} from "../constants";


class CheckInComplete extends React.Component {

  componentDidMount() {
    this.props.dispatch(visitActions.fetchActiveVisits(
      (this.props.session.sessionLocation ? this.props.session.sessionLocation.uuid : null, ACTIVE_VISITS_REP)
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
