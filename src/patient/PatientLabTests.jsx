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
      if ((typeof this.props.patient.labTests[this.props.test_type] !== 'undefined')
        && (this.props.patient.labTests[this.props.test_type] !== null)) {
        labTests = [...this.props.patient.labTests[this.props.test_type]].sort(function (a, b) {
          return +new Date(b.effectiveDate) - +new Date(a.effectiveDate);
        }).map((lab, i) => {
          return (
            <div key={lab.effectiveDate}>
              <h4>{lab.testType ? (utils.getConceptNameByUuid(lab.testType)) : ""}</h4>
              <ul>
                <li>Effective Date: {lab.effectiveDate !== null ? utils.formatCalendarDate(lab.effectiveDate) : ""}</li>
                <li>Results: <Label
                  bsStyle="danger"> {([
                  lab.result ? utils.getConceptNameByUuid(lab.result) : "",
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

