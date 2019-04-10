import React from "react";
import { connect } from "react-redux";
import { selectors } from '@openmrs/react-components';
import SummaryAndForm from "../../layout/SummaryAndForm";
import VLSummary from "./VLSummary";
import VLForm from "./VLForm";
import vlFilters from "./vlFilters";
import {ENCOUNTER_TYPES} from "../../constants";

const VLSummaryAndForm = props => {

  return (
    <SummaryAndForm
      completed={vlFilters.completed(props.patient)}
      encounterType={ENCOUNTER_TYPES.VLEncounterType}
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
