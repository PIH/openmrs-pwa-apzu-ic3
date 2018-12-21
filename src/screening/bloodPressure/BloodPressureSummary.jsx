import React from "react";
import {ObsHistory} from '@openmrs/react-components';
import {CONCEPTS} from "../../constants";

const BloodPressureSummary = props => {
  return (
    <ObsHistory
      concepts={[CONCEPTS.DiastolicBloodPressure, CONCEPTS.SystolicBloodPressure]}
    />
  );
};

export default BloodPressureSummary;
