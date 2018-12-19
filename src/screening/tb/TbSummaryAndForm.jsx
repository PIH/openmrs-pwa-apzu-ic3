import React from "react";
import SummaryAndForm from "../../layout/SummaryAndForm";
import TbSummary from "./TbSummary";
import TbForm from "./TbForm";

const TbSummaryAndForm = props => {

  return (
    <SummaryAndForm
      // TODO Implement Queue for TB then update the link
      backLink="/screening/nutrition/queue"
      form={<TbForm />}
      summary={<TbSummary />}
      title="Tuberculosis"
    />
  );

};

export default TbSummaryAndForm;
