import React from "react";
import { connect } from "react-redux";
import { selectors } from '@openmrs/react-components';
import SummaryAndForm from "../../layout/SummaryAndForm";
import VLSummary from "./VLSummary";
import VLForm from "./VLForm";
import vlFilters from "./vlFilters";

const VLSummaryAndForm = props => {

  return (
    <SummaryAndForm
      backLink="/screening/vl/tabs"
      completed={vlFilters.completed(props.patient)}
      form={<VLForm/>}
      summary={<VLSummary/>}
      title="Viral Load"
    />
  );

};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
  };
};
export default connect(mapStateToProps)(VLSummaryAndForm);
