import React from "react";
import SummaryAndForm from "../../layout/SummaryAndForm";
import VLSummary from "./VLSummary";
import VLForm from "./VLForm";

const VLSummaryAndForm = props => {

  return (
    <SummaryAndForm
      backLink="/screening/vl/tabs"
      form={<VLForm/>}
      summary={<VLSummary/>}
      title="Viral Load"
    />
  );

};

export default VLSummaryAndForm;
