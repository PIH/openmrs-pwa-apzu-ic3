import React from "react";
import PatientLabTests from "../../patient/PatientLabTests";

const EidSummary = props => {
  return (
    <span>
      <PatientLabTests test_type={"hiv_tests"} />
      {/*  <PatientLabTests test_type={"viral_load_tests"} />*/}
    </span>
  );
};

export default EidSummary;
