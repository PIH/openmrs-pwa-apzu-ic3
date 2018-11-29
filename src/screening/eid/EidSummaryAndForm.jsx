import React from "react";
import SummaryAndForm from "../../layout/SummaryAndForm";
import EidSummary  from "./EidSummary";
import EidForm from "./EidForm";

const EidSummaryAndForm = props => {

  return (
    <SummaryAndForm
      backLink="/screening/eid/queue"
      form={<EidForm />}
      summary={<EidSummary />}
      title="EID"
    />
  );

};

export default EidSummaryAndForm;
