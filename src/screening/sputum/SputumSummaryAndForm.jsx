import React from "react";
import { connect } from "react-redux";
import { selectors } from '@openmrs/react-components';
import SummaryAndForm from "../../layout/SummaryAndForm";
import SputumSummary from "./SputumSummary";
import SputumForm from "./SputumForm";
import sputumFilters from './sputumFilters';


const SputumSummaryAndForm = props => {

  return (
    <SummaryAndForm
      backLink="/screening/sputum"
      completed={sputumFilters.completed(props.patient)}
      form={<SputumForm />}
      summary={<SputumSummary />}
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
