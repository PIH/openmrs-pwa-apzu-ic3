import React from "react";
import PatientLabTests from "../../patient/PatientLabTests";

const HtcSummary = props => {
  return (
    <div>
      <PatientLabTests test_type={"hiv_tests"}/>
    </div>
  );
};

export default HtcSummary;
