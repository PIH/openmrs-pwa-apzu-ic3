import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';
import {selectors} from '@openmrs/react-components';
import utils from '../utils';


class PatientLabTests extends React.Component {

  render() {
    let labTests = null;
    if (typeof this.props.test_type !== 'undefined') {
      let filteredTests = this.props.patient.labTests[this.props.test_type];

    if ( (typeof filteredTests !== 'undefined') && (filteredTests !== null) ) {
      labTests = filteredTests.map((lab, i) => {
        return (
          <div key={lab.specimenDate}>
            <h4>{lab.testType} @ {lab.specimenDate !== null ? utils.formatCalendarDate(lab.specimenDate) : '_'}</h4>
            <ul>
              <li>Date
                entered: {lab.resultDate !== null ? utils.formatCalendarDate(lab.resultDate) : '_'}</li>
              <li>Results: <Label
                bsStyle="danger"> {([
                  lab.result,
                  lab.resultNumeric,
                  lab.resultLdl === true ? "LDL" : lab.resultLdl
              ]).filter(Boolean).join(", ")}</Label>
              </li>
            </ul>
          </div>

        );
      });
    }
  }

    return (
      <div>
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

