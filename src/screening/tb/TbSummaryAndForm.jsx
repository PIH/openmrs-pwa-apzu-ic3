import React from "react";
import { connect } from "react-redux";
import { selectors } from '@openmrs/react-components';
import SummaryAndForm from "../../layout/SummaryAndForm";
import TbSummary from "./TbSummary";
import TbForm from "./TbForm";
import tbFilters from "./tbFilters";

const TbSummaryAndForm = props => {

  return (
    <SummaryAndForm
      backLink="/screening/tb/queue"
      completed={tbFilters.completed(props.patient)}
      form={<TbForm />}
      summary={<TbSummary />}
      title="Tuberculosis"
    />
  );

};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
  };
};
export default connect(mapStateToProps)(TbSummaryAndForm);
