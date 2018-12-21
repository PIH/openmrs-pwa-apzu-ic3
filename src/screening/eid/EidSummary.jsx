import React from "react";
import {ObsHistory} from '@openmrs/react-components';
import PatientLabTests from "../../patient/PatientLabTests";
import {CONCEPTS} from "../../constants";

const EidSummary = props => {
  return (
    <span>
      <PatientLabTests test_type={ "viral_load_tests" }/>
      <PatientLabTests test_type={ "hiv_tests" }/>
      <ObsHistory
        concepts={[CONCEPTS.HIV_TEST_TYPE,
          CONCEPTS.Bled,
          CONCEPTS.ReasonForNoSample,
          CONCEPTS.ReasonForTesting,
          CONCEPTS.LabLocation,
          CONCEPTS.HIV_TEST_RESULTS
        ]}
      />
    </span>
  );
};

export default EidSummary;
