import React from "react";
import { connect } from 'react-redux';
import { selectors } from '@openmrs/react-components';
import SummaryAndForm from "../../layout/SummaryAndForm";
import LabStationResultsSummary from "./LabStationResultsSummary";
import LabStationResultsForm from "./LabStationResultsForm";
import labStationFilters from "./labStationFilters";
import { ENCOUNTER_TYPES } from "../../constants";

const LabStationResultsSummaryAndForm = props => {

  return (
    <SummaryAndForm
      allowMultipleForms
      completed={labStationFilters.completed(props.patient)}
      encounterType={ENCOUNTER_TYPES.LabStationResultsEncounterType}
      form={<LabStationResultsForm />}
      summary={<LabStationResultsSummary />}
      title="Lab Station Results"
    />
  );

};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
  };
};

export default connect(mapStateToProps)(LabStationResultsSummaryAndForm);
