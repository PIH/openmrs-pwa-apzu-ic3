import React from "react";
import {ObsHistory, ProgramEnrollment} from '@openmrs/react-components';
import {CONCEPTS} from "../../constants";

const ClinicianSummary = props => {
  return (
    <div>
      <ProgramEnrollment />
      <h4><u>Diagnoses</u></h4>
      <ObsHistory
        concepts={[CONCEPTS.ChronicCareDiagnosis]}
      />
      <br />
      <h4><u>Alert this visit</u></h4>
      <p>Lorem Ipsum is simply dummy text of the printing and 
        typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s</p>
    </div>
  );
};

export default ClinicianSummary;
