import React from "react";
import SummaryAndForm from "../../layout/SummaryAndForm";
import BloodPressureSummary from "./BloodPressureSummary";
import BloodPressureForm from "./BloodPressureForm";

const BloodPressureSummaryAndForm = props => {

  return (
    <SummaryAndForm
      backLink="/screening/bloodPressure/queue"
      form={<BloodPressureForm/>}
      summary={<BloodPressureSummary/>}
      title="Blood Pressure"
    />
  );

};

export default BloodPressureSummaryAndForm;
