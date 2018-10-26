import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';
import {selectors} from '@openmrs/react-components';
import utils from '../utils';


class PatientLabTests extends React.Component {

  render() {
    let labTests = this.props.patient.labTests.map((lab, i) => {
        if ( (typeof this.props.test_type === 'undefined') ||
          (typeof this.props.test_type !== 'undefined' && this.props.test_type.indexOf(lab.test_type) >= 0) ) {
          return (
            <div key={lab.lab_test_id}>
              <h4>{lab.test_type} @ {lab.date_collected !== null ? utils.formatCalendarDate(lab.date_collected) : '_'}</h4>
              <ul>
                <li>Date
                  entered: {lab.date_result_entered !== null ? utils.formatCalendarDate(lab.date_result_entered) : '_'}</li>
                <li>Results: <Label
                  bsStyle="danger"> {([lab.result_coded, lab.result_numeric, lab.result_exception]).filter(Boolean).join(", ")}</Label>
                </li>
              </ul>
            </div>

          );
        } else {
          return null;
        }
    });

    return (
      <div>
        <h3><Label>History</Label></h3>
        { labTests }
      </div>
    );
  }
}

PatientLabTests.propTypes = {
  patient: PropTypes.object.isRequired,
  test_type: PropTypes.string
};

export default connect(state => {

  const storePatient = selectors.getSelectedPatientFromStore(state);

  return {
    patient: (storePatient && storePatient.labTests) ? storePatient : { "labTests": [] }
  };
})(PatientLabTests);

