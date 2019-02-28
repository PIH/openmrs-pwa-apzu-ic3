import React from "react";
import { connect } from "react-redux";
import { selectors } from '@openmrs/react-components';
import SummaryAndForm from "../../layout/SummaryAndForm";
import SputumSummary from './SputumSummary';
import sputumFilters from './sputumFilters';
import TbTestResultForm from "../tbTest/TbTestResultForm";


const SputumSummaryAndForm = props => {

  return (
    <SummaryAndForm
      backLink="/screening/sputum"
      completed={sputumFilters.completed(props.patient)}
      form={<TbTestResultForm displayResultsSection={false}/>}
      summary={<SputumSummary/>}
      title="Sputum"
    />
  );
};


const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
  };
};

export default connect(mapStateToProps)(SputumSummaryAndForm);
