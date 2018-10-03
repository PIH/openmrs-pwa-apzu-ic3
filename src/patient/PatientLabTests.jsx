import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';
import utils from '../utils';


class PatientLabTests extends React.Component {

  render() {
    let labTests = this.props.patient.labTests.map((lab, i) => {
      return (
        <div key={ lab.lab_test_id }>
          <h4>{ lab.test_type } @ { lab.date_collected !== null ? utils.formatCalendarDate(lab.date_collected) : '_' }</h4>
          <ul>
            <li>Date entered: { lab.date_result_entered !== null ? utils.formatCalendarDate(lab.date_result_entered) : '_'}</li>
            <li>Results: <Label bsStyle="danger"> { ([lab.result_coded, lab.result_numeric, lab.result_exception]).filter(Boolean).join(", ") }</Label></li>
          </ul>
        </div>
      );
    });

    return (
      <div>{ labTests }</div>
    )
  }
}

PatientLabTests.propTypes = {
  patient: PropTypes.object.isRequired
};

export default connect(state => {
  return {
    patient: (state.openmrs.selectedPatient
      && state.openmrs.patients[state.openmrs.selectedPatient]
      && state.openmrs.patients[state.openmrs.selectedPatient].labTests)
      ? state.openmrs.patients[state.openmrs.selectedPatient] : { "labTests": [] }
  };
})(PatientLabTests);

