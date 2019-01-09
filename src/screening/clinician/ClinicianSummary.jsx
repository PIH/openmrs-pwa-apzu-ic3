import React from "react";
import {ProgramEnrollment} from '@openmrs/react-components';

const ClinicianSummary = props => {
  return (
    <div>
      <ProgramEnrollment />
      <h4><u>Diagnoses</u></h4>
      <p>Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s</p>
      <br />
      <h4><u>Alert this visit</u></h4>
      <p>Lorem Ipsum is simply dummy text of the printing and 
        typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s</p>
    </div>
  );
};

export default ClinicianSummary;
