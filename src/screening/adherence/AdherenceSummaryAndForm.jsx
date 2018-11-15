import React from "react";
import SummaryAndForm from "../../layout/SummaryAndForm";
import AdherenceSummary from "./AdherenceSummary";
import AdherenceForm from "./AdherenceForm";

const AdherenceSummaryAndForm = props => {

  return (
    <SummaryAndForm
      backLink="/screening/adherence/queue"
      form={<AdherenceForm/>}
      summary={<AdherenceSummary/>}
      title="Blood Pressure"
    />
  );

};

export default AdherenceSummaryAndForm;
