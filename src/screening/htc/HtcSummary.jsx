import React from "react";
import {ENCOUNTER_TYPES, HIV_TEST_TYPES} from "../../constants";
import PatientLabTests from "../../patient/PatientLabTests";
import {EncounterHistory} from "@openmrs/react-components";

const HtcSummary = props => {
  return (
    <div>
      <PatientLabTests test_type={HIV_TEST_TYPES.hiv_test + "; " + HIV_TEST_TYPES.rapid_test}/>
      <EncounterHistory
        encounterType={ENCOUNTER_TYPES.HTCEncounterType}
      />
    </div>
  );
};

export default HtcSummary;
