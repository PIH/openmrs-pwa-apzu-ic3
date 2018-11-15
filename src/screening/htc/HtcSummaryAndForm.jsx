import React from "react";
import SummaryAndForm from "../../layout/SummaryAndForm";
import HtcSummary from "./HtcSummary";
import HtcForm from "./HtcForm";

const HtcSummaryAndForm = props => {

  return (
    <SummaryAndForm
      backLink="/screening/htc/queue"
      form={<HtcForm/>}
      summary={<HtcSummary/>}
      title="HTC"
    />
  );

};

export default HtcSummaryAndForm;
