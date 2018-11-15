import React from "react";
import {HIV_TEST_TYPES} from "../../constants";
import PatientLabTests from "../../patient/PatientLabTests";

const HtcSummary = props => {
  return (
    <PatientLabTests test_type={HIV_TEST_TYPES.hiv_test + "; " + HIV_TEST_TYPES.rapid_test}/>
  );
};

export default HtcSummary;
