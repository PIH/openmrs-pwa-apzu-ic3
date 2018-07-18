import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { visitActions } from '@openmrs/react-components';
import { VISIT_REPRESENTATION } from '../constants';


class CompletedScreenings extends React.Component {

  componentDidMount() {
    this.props.dispatch(visitActions.fetchPatientActiveVisit(this.props.patientUuid,
      "custom:" + VISIT_REPRESENTATION));
  }

  render() {

    let encounters = this.props.activeVisit.encounters.map((encounter, i) => {
      return (
        <div key={encounter.id}>
          <h4>{encounter.display}</h4>
          <ul>{encounter.obs.map((observation) => {
            return (
              <li key={observation.id}>{observation.display}</li>
            );
          })}</ul>
        </div>
      );
    });

    return (
      <div>
        { encounters }
      </div>
    );
  }
}

CompletedScreenings.propTypes = {
  patientUuid: PropTypes.string.isRequired,
  activeVisit: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    activeVisit: state.selectedPatient.visit.activeVisit ? state.selectedPatient.visit.activeVisit : { "encounters" : [] }
  };
};

export default connect(mapStateToProps)(CompletedScreenings);
