import React from "react";
import SummaryAndForm from "../../layout/SummaryAndForm";
import TBTestSummary from "./TBTestSummary";
import TBTestForm from "./TBTestForm";

const VLSummaryAndForm = props => {

  return (
    <SummaryAndForm
      backLink="/screening/vl/tabs"
      form={<TBTestForm />}
      summary={<TBTestSummary />}
      title="Tuberculosis Test Result"
    />
  );

};

export default VLSummaryAndForm;
