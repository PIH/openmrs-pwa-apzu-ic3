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
      <h4><u>Alert this visit</u></h4>
      <p>Lorem Ipsum is simply dummy text of the printing and 
        typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state)
  };
};

export default connect(mapStateToProps)(ClinicianSummary);


