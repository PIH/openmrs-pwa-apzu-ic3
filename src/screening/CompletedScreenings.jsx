import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { visitActions } from '@openmrs/react-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { VISIT_REPRESENTATION } from '../constants';
import utils from "../utils";

class CompletedScreenings extends React.Component {

  componentDidMount() {
    this.props.dispatch(visitActions.fetchPatientActiveVisit(this.props.patientUuid,
      "custom:" + VISIT_REPRESENTATION));
  }

  render() {

    let encounters = this.props.activeVisit.encounters.map((encounter, i) => {
      return (
        <ListItem key={encounter.id}>
          <Typography variant="subheading">{encounter.display} @ { utils.formatTime(encounter.encounterDatetime) }</Typography>
          <List>{encounter.obs.map((observation) => {
            return (
              <ListItem key={observation.id}><Typography variant="subheading">{observation.display}</Typography></ListItem>
            );
          })}</List>
        </ListItem>
      );
    });

    return (
      <div>
        <List>
          { encounters }
        </List>
      </div>
    );
  }
}

CompletedScreenings.propTypes = {
  patientUuid: PropTypes.string.isRequired,
  activeVisit: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    activeVisit: state.selectedPatient.visit.activeVisit ? state.selectedPatient.visit.activeVisit : { "encounters" : [] }
  };
};

export default connect(mapStateToProps)(CompletedScreenings);
