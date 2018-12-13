import React from "react";
import { ENCOUNTER_TYPES } from "../../constants";
import PatientLabTests from "../../patient/PatientLabTests";
import {EncounterHistory} from "@openmrs/react-components";

const HtcSummary = props => {
  return (
    <div>
      <PatientLabTests test_type={ "hiv_tests" }/>
      <EncounterHistory
        encounterType={ENCOUNTER_TYPES.HTCEncounterType}
      />
    </div>
  );
};

export default HtcSummary;
