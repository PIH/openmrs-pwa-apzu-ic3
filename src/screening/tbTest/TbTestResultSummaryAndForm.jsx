import React from "react";
import { connect } from "react-redux";
import { selectors } from '@openmrs/react-components';
import SummaryAndForm from "../../layout/SummaryAndForm";
import TbTestResultSummary from "./TbTestResultSummary";
import TbTestResultForm from "./TbTestResultForm";
import tbTestResultFilters from "./tbTestResultFilters";

const TbTestResultSummaryAndForm = props => {

  return (
    <SummaryAndForm
      backLink="/screening"
      completed={tbTestResultFilters.completed(props.patient)}
      form={<TbTestResultForm displayResultsSection={true}/>}
      summary={<TbTestResultSummary />}
      title="Tuberculosis Test Results"
    />
  );

};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
  };
};

export default connect(mapStateToProps)(TbTestResultSummaryAndForm);
