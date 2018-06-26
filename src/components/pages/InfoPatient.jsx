import React from "react";
import { connect } from "react-redux";
import { PatientInfo } from '@openmrs/react-components';
import { gridActions } from '@openmrs/react-components';
import RequiredScreenings from '../../screening/RequiredScreenings';


class InfoPatient extends React.Component {

  componentWillUnmount(){
    this.props.dispatch(gridActions.clearSelection());
  }

  render() {
    return (
      <div>
        <PatientInfo
          patient={this.props.patient}
        />
        <RequiredScreenings patientUuid={this.props.patient.uuid} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    patient: state.selected.patient
  };
};

export default connect(mapStateToProps)(InfoPatient);
