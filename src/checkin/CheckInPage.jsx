import React from "react";
import { connect } from "react-redux";
import { selectors } from '@openmrs/react-components';
import CheckInSummary from "./CheckInSummary";
import ReferralForm from "./ReferralForm";
import SummaryAndForm from "../layout/SummaryAndForm";
import checkInFilters from "./checkInFilters";
import {ENCOUNTER_TYPES} from "../constants";

const CheckInPage = (props) =>  {
  return (
    <div>
      <SummaryAndForm
        backLink="/checkin/checkInTabs"
        afterSubmitLink="/checkin/checkInPage"
        completed={checkInFilters.completed(props.patient)}
        encounterType={ENCOUNTER_TYPES.CheckInEncounterType}
        form={<ReferralForm />}
        requireVisitForForm={false}
        summary={<CheckInSummary />}
        toastMessage="Checked-In!"
        title="Patient Check-In"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
  };
};

export default connect(mapStateToProps)(CheckInPage);
