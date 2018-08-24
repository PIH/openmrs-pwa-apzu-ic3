import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import utils from "../utils";

// TODO: potentially refactor so that you pass the patient into this instead of wiring to the store?
class CompletedScreenings extends React.Component {

  render() {

    let encounters = this.props.activeVisit.encounters.map((encounter, i) => {
      return (
        <div key={encounter.id}>
          <h4>{encounter.display} @ { utils.formatTime(encounter.encounterDatetime) }</h4>
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
  activeVisit: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    activeVisit: state.selectedPatient && state.patients[state.selectedPatient] && state.patients[state.selectedPatient].visit ?
      state.patients[state.selectedPatient].visit : { "encounters": [] }
  };
};


export default connect(mapStateToProps)(CompletedScreenings);
