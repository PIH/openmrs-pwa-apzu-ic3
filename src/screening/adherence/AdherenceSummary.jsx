import React from "react";
import PatientLabTests from "../../patient/PatientLabTests";
import AdherenceSessions from "./AdherenceSessions";

const AdherenceSummary = props => {
  return (
    <div>
      <PatientLabTests test_type="Viral Load"/>
      <AdherenceSessions/>
    </div>
  );
};

export default AdherenceSummary;
