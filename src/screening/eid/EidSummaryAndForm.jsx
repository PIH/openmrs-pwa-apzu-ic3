import React from "react";
import { connect } from 'react-redux';
import { selectors } from '@openmrs/react-components';
import SummaryAndForm from "../../layout/SummaryAndForm";
import EidSummary  from "./EidSummary";
import EidForm from "./EidForm";
import eidFilters from "./eidFilters";
import {ENCOUNTER_TYPES} from "../../constants";

const EidSummaryAndForm = props => {

  return (
    <SummaryAndForm
      backLink="/screening/eid/queue"
      completed={eidFilters.completed(props.patient)}
      encounterType={ENCOUNTER_TYPES.EidEncounterType}
      form={<EidForm />}
      summary={<EidSummary />}
      title="EID"
    />
  );

};


const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
  };
};

export default connect(mapStateToProps)(EidSummaryAndForm);
