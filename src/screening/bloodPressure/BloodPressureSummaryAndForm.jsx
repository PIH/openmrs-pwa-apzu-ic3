import React from "react";
import SummaryAndForm from "../../layout/SummaryAndForm";
import ReferralForm from "../../checkin/ReferralForm";
import CheckInSummary from "../../checkin/CheckInSummary";
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
