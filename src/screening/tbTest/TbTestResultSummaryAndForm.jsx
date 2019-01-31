import React from "react";
import SummaryAndForm from "../../layout/SummaryAndForm";
import TbTestResultSummary from "./TbTestResultSummary";
import TbTestResultForm from "./TbTestResultForm";

const TbTestResultSummaryAndForm = props => {

  return (
    <SummaryAndForm
      backLink="/screening"
      form={<TbTestResultForm />}
      summary={<TbTestResultSummary />}
      title="Tuberculosis Test Result"
    />
  );

};

export default TbTestResultSummaryAndForm;
