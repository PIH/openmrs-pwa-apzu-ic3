import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { visitActions } from '@openmrs/react-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { PATIENT_REPRESENTATION } from '../constants';

class RequiredScreenings extends React.Component {

  // TODO make this potentially come from props so we can override it? or a generic action to "fetch queues"?
  componentDidMount() {
    this.props.dispatch(visitActions.fetchActiveVisits("custom:(patient:" + PATIENT_REPRESENTATION + ",encounters:default)"));
  }

  nameMappings = {
    bloodPressureQueue: "Blood Pressure Screening",
    nutritionQueue: "Nutrition Screening",
    nurseQueue: "Nurse Station"
  };

  findScreeningsForPatient() {
    if (this.props.screening) {
      // find any of the queues that have the patient in them
      return Object.entries(this.props.screening).filter((queue) => {
        return queue[1] && queue[1].some((elem) => {
          return (elem && elem.uuid === this.props.patientUuid);
        });
      }).map((queue) => this.nameMappings[queue[0]]);
    }
    else {
      return null;
    }
  }

  render() {
    return (
      <div>
        <List>
          { this.findScreeningsForPatient().map((e, i) => <ListItem key={i}><Typography variant="subheading">{e}</Typography></ListItem>) }
        </List>
      </div>
    );
  }
}

RequiredScreenings.propTypes = {
  patientUuid: PropTypes.string.isRequired,
  screening: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    screening: state.screening
  };
};

export default connect(mapStateToProps)(RequiredScreenings);

