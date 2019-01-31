import React from "react";
import {connect} from "react-redux";
import {ObsHistory, ProgramEnrollment, selectors, formUtil } from '@openmrs/react-components';
import ChronicCareDiagnoses from './ChronicCareDiagnoses';

const ClinicianSummary = props => {

  // TODO move this into util method?

  let obs = [];
  if (props.patient && props.patient.visit && props.patient.visit.encounters) {
    obs = props.patient.visit.encounters.reduce((acc, encounter) => {
      return [...acc, ...encounter.obs];
    }, []);
  }
  obs = formUtil.flattenObs(obs);

  return (
    <div>
      <ProgramEnrollment />
      <ChronicCareDiagnoses />
      <h4><u>Visit Summary</u></h4>
      <ObsHistory
        obs={obs}
        showDates={false}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state)
  };
};

export default connect(mapStateToProps)(ClinicianSummary);


