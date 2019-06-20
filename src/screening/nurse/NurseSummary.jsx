import React from "react";
import { connect } from 'react-redux';
import {
  ProgramEnrollment,
  selectors,
} from '@openmrs/react-components';
import { uniqBy, prop } from "ramda";

import ChronicCareDiagnoses from '../clinician/ChronicCareDiagnoses';
import VisitSummary from "../clinician/VisitSummary";


const NurseSummary = ({ patient }) => {

  return (
    <div className="summary-content">
      <div className="left-summary-content">
        <span className="patient-alert">
          {uniqBy(prop('alert'))(patient.alert).map((alert) => (
            <span key={alert.name}>{alert.alert}</span>
          ))}
        </span>
      </div>
      <div className="right-summary-content nursing-summary-right-content">
        <ProgramEnrollment />
        <ChronicCareDiagnoses />
        <VisitSummary />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state)
  };
};

export default connect(mapStateToProps)(NurseSummary);


