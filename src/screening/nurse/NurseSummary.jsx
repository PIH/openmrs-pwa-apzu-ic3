import React from "react";
import {
  ProgramEnrollment,
} from '@openmrs/react-components';
import ChronicCareDiagnoses from '../clinician/ChronicCareDiagnoses';
import VisitSummary from "../clinician/VisitSummary";


const NurseSummary = () => {

  return (
    <div>
      <ProgramEnrollment />
      <ChronicCareDiagnoses />
      <VisitSummary />
    </div>
  );
};

export default NurseSummary;


