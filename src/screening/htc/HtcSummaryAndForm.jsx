import React from "react";
import { connect } from 'react-redux';
import { selectors } from '@openmrs/react-components';
import SummaryAndForm from "../../layout/SummaryAndForm";
import HtcSummary from "./HtcSummary";
import HtcForm from "./HtcForm";
import htcFilters from "./htcFilters";
import {ENCOUNTER_TYPES} from "../../constants";

const HtcSummaryAndForm = props => {

  return (
    <SummaryAndForm
      completed={htcFilters.completed(props.patient)}
      encounterType={ENCOUNTER_TYPES.HTCEncounterType}
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
