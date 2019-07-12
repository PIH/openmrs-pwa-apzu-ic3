import React from "react";
import { connect } from 'react-redux';
import { selectors } from '@openmrs/react-components';
import SummaryAndForm from "../../layout/SummaryAndForm";
import BloodSugarTestSummary from "./BloodSugarTestSummary";
import BloodSugarTestForm from "./BloodSugarTestForm";
import bloodSugarFilters from "./bloodSugarFilters";
import { ENCOUNTER_TYPES } from "../../constants";

const BloodSugarTestSummaryAndForm = props => {

  return (
    <SummaryAndForm
      completed={ bloodSugarFilters.completed(props.patient) }
      encounterType={ ENCOUNTER_TYPES.BloodSugarScreeningEncounterType }
      form={<BloodSugarTestForm/>}
      summary={<BloodSugarTestSummary/>}
      title="Blood Sugar Screening"
    />
  );

};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
  };
};

export default connect(mapStateToProps)(BloodSugarTestSummaryAndForm);
