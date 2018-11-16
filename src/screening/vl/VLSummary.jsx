import React from "react";
import PatientLabTests from "../../patient/PatientLabTests";
import {ENCOUNTER_TYPES} from "../../constants";
import {EncounterHistory} from "@openmrs/react-components";

const VLSummary = props => {
  return (
    <div>
      <PatientLabTests/>
      <EncounterHistory
        encounterType={ENCOUNTER_TYPES.VLEncounterType}
      />
    </div>
  );
};

export default VLSummary;
