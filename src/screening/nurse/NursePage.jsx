import React from "react";
import { connect } from "react-redux";
import { selectors } from '@openmrs/react-components';
import SummaryAndForm from "../../layout/SummaryAndForm";
import NurseSummary from "./NurseSummary";
import nurseFilters from "./nurseFilters";
import { ENCOUNTER_TYPES } from "../../constants";


const NursePage = props => {
  return (
    <SummaryAndForm
      completed={nurseFilters.completed(props.patient)}
      encounterType={ENCOUNTER_TYPES.NurseEvaluationEncounterType}
      summary={<NurseSummary />}
      title="Nursing"
    />
  );
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state)
  };
};

export default connect(mapStateToProps)(NursePage);
