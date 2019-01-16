import React from "react";
import { connect } from "react-redux";
import { selectors } from '@openmrs/react-components';
import SummaryAndForm from "../../layout/SummaryAndForm";
import NutritionSummary from "./NutritionSummary";
import NutritionForm from "./NutritionForm";
import nutritionFilters from './nutritionFilters';

const NutritionSummaryAndForm = props => {

  return (
    <SummaryAndForm
      backLink="/screening/nutrition/queue"
      completed={nutritionFilters.completed(props.patient)}
      form={<NutritionForm/>}
      summary={<NutritionSummary/>}
      title="Nutrition"
    />
  );

};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
  };
};

export default connect(mapStateToProps)(NutritionSummaryAndForm);
