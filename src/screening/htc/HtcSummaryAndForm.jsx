import React from "react";
import { connect } from 'react-redux';
import { selectors } from '@openmrs/react-components';
import SummaryAndForm from "../../layout/SummaryAndForm";
import HtcSummary from "./HtcSummary";
import HtcForm from "./HtcForm";
import htcFilters from "./htcFilters";

const HtcSummaryAndForm = props => {

  return (
    <SummaryAndForm
      backLink="/screening/htc/queue"
      completed={htcFilters.completed(props.patient)}
      form={<HtcForm/>}
      summary={<HtcSummary/>}
      title="HTC"
    />
  );

};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
  };
};

export default connect(mapStateToProps)(HtcSummaryAndForm);
