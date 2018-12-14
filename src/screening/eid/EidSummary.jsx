import React from "react";
import {EncounterHistory} from '@openmrs/react-components';
import PatientLabTests from "../../patient/PatientLabTests";
import { ENCOUNTER_TYPES } from "../../constants";

const EidSummary = props => {
  return (
    <span>
      <PatientLabTests test_type={ "viral_load_tests" }/>
      <PatientLabTests test_type={ "hiv_tests" }/>
      <EncounterHistory
        encounterType={ENCOUNTER_TYPES.EidEncounterType}
      />
      <EncounterHistory
        encounterType={ENCOUNTER_TYPES.HTCEncounterType}
      />
    </span>
  );
};

export default EidSummary;
