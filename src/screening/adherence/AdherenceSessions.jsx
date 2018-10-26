import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';
import {encounterRest, selectors} from '@openmrs/react-components';
import { ENCOUNTER_TYPES } from '../../constants';
import utils from "../../utils";


class AdherenceSessions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      encounters: []
    };
  }

  componentDidMount() {
    encounterRest.fetchEncountersByPatient(
      this.props.patient.uuid, ENCOUNTER_TYPES.AdherenceCounselingEncounterType.uuid
    ).then(data => {
      this.setState({
        encounters: data.results.sort(function (a, b) {
          return +new Date(a.encounterDatetime) - +new Date(b.encounterDatetime);
        })
      });
    });
  }

  render() {
    let sessions = this.state.encounters.map((session, i) => {
      return (
        <div key={session.id}>
          <h4>{ utils.formatCalendarDate(session.encounterDatetime) }</h4>
          <ul>
            <li key="1"><Label bsStyle="info">{ utils.getAdherenceSessionNumber(session.obs) }</Label></li>
            <li key="2">Provider: { utils.getAdherenceCounselor(session.obs) } </li>
          </ul>
        </div>
      );
    });
    return (
      <div>
        <h3><Label>Adherence Counseling</Label></h3>
        { sessions }
      </div>
    );
  }
}

AdherenceSessions.propTypes = {
  patient: PropTypes.object.isRequired
};

export default connect(state => {
  return {
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(AdherenceSessions);
