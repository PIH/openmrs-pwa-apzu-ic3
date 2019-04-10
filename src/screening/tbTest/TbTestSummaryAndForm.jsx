import React from "react";
import {connect} from "react-redux";
import {selectors} from '@openmrs/react-components';
import SummaryAndForm from "../../layout/SummaryAndForm";
import TbTestSummary from "./TbTestSummary";
import TbTestResultForm from "./TbTestForm";
import tbTestResultFilters from "./tbTestFilters";
import {ENCOUNTER_TYPES} from "../../constants";

const TbTestSummaryAndForm = props => {

  return (
    <SummaryAndForm
      completed={tbTestResultFilters.completed(props.patient)}
      encounterType={ENCOUNTER_TYPES.TBTestResults}
      form={<TbTestResultForm displayResultsSection={true}/>}
      summary={<TbTestSummary/>}
      title="Tuberculosis Test"
    />
  );

};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
  };
};

export default connect(mapStateToProps)(TbTestSummaryAndForm);
