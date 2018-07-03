import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { visitActions } from '@openmrs/react-components';

class RequiredScreenings extends React.Component {

  // TODO make this potentially come from props so we can override it? or a generic action to "fetch queues"?
  componentDidMount() {
    this.props.dispatch(visitActions.fetchActiveVisits("custom:(patient:default,encounters:default)"));
  }

  nameMappings = {
    bloodPressureQueue: "Blood Pressure Screening",
    nutritionQueue: "Nutrition Screening"
  };

  findScreeningsForPatient() {
    if (this.props.screening) {
      // find any of the queues that have the patient in them
      return Object.entries(this.props.screening).filter((queue) => {
        return queue[1].list && queue[1].list.some((elem) => {
          return (elem.patient && elem.patient.uuid === this.props.patientUuid);
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
        <ul>
          { this.findScreeningsForPatient().map((e) => <li>{e}</li>) }
        </ul>
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

