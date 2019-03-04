import React from "react";
import { connect } from "react-redux";
import { selectors } from '@openmrs/react-components';
import SummaryAndForm from "../../layout/SummaryAndForm";
import AdherenceSummary from "./AdherenceSummary";
import AdherenceForm from "./AdherenceForm";
import adherenceFilters from './adherenceFilters';
import {ENCOUNTER_TYPES} from "../../constants";


const AdherenceSummaryAndForm = props => {

  return (
    <SummaryAndForm
      backLink="/screening/adherence/queue"
      completed={adherenceFilters.completed(props.patient)}
      encounterType={ENCOUNTER_TYPES.AdherenceCounselingEncounterType}
      form={<AdherenceForm/>}
      summary={<AdherenceSummary/>}
      title="Adherence Counseling"
    />
  );
};


const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
  };
};

export default connect(mapStateToProps)(AdherenceSummaryAndForm);
