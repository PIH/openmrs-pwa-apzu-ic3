import React from "react";
import CheckInSummary from "./CheckInSummary";
import ReferralForm from "./ReferralForm";
import SummaryAndForm from "../layout/SummaryAndForm";

class CheckInPage extends React.Component {

  render() {
    return (
      <div>
        <SummaryAndForm
          backLink="/checkin/checkInTabs"
          form={<ReferralForm/>}
          requireVisitForForm={false}
          summary={<CheckInSummary/>}
          title="Patient Check-In"
        />
      </div>
    );
  }
}

export default CheckInPage;
