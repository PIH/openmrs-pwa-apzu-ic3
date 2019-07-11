import React from "react";
import { connect } from 'react-redux';
import { selectors } from '@openmrs/react-components';
import SummaryAndForm from "../../layout/SummaryAndForm";
import CervicalCancerSummary from "./CervicalCancerSummary";
import CervicalCancerForm from "./CervicalCancerForm";
import cervicalFilters from "./cervicalFilters";
import { ENCOUNTER_TYPES } from "../../constants";

const CervicalCancerSummaryAndForm = props => {

  return (
    <SummaryAndForm
      completed={ cervicalFilters.completed(props.patient) }
      encounterType={ ENCOUNTER_TYPES.CervicalCancerScreeningEncounterType }
      form={<CervicalCancerForm/>}
      summary={<CervicalCancerSummary/>}
      title="Cervical Cancer Screening"
    />
  );

};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
  };
};

export default connect(mapStateToProps)(CervicalCancerSummaryAndForm);
