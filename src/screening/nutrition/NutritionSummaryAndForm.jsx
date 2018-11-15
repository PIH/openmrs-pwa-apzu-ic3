import React from "react";
import SummaryAndForm from "../../layout/SummaryAndForm";
import NutritionSummary from "./NutritionSummary";
import NutritionForm from "./NutritionForm";

const NutritionSummaryAndForm = props => {

  return (
    <SummaryAndForm
      backLink="/screening/nutrition/queue"
      form={<NutritionForm/>}
      summary={<NutritionSummary/>}
      title="Nutrition"
    />
  );

};

export default NutritionSummaryAndForm;
