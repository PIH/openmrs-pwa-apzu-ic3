import React from "react";
import { connect } from "react-redux";
import { selectors } from '@openmrs/react-components';
import SummaryAndForm from "../../layout/SummaryAndForm";
import ClinicianSummary from "./ClinicianSummary";
import ClinicianForm from "./ClinicianForm";
import cliniicianFilters from "./cliniicianFilters";

const ClinicianSummaryAndForm = props => {

  return (
    <SummaryAndForm
      backLink="/screening/clinician/form"
      completed={cliniicianFilters.completed(props.patient)}
      form={<ClinicianForm/>}
      summary={<ClinicianSummary/>}
      title="Clinician"
    />
  );

};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
  };
};

export default connect(mapStateToProps)(ClinicianSummaryAndForm);

