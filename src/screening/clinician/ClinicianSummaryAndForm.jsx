import React from "react";
import SummaryAndForm from "../../layout/SummaryAndForm";
import ClinicianSummary from "./ClinicianSummary";
import ClinicianForm from "./ClinicianForm";

const HtcSummaryAndForm = props => {

  return (
    <SummaryAndForm
      backLink="/screening/clinician/form"
      form={<ClinicianForm/>}
      summary={<ClinicianSummary/>}
      title="Clinician"
    />
  );

};

export default HtcSummaryAndForm;
