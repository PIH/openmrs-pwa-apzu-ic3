import React from "react";
import { connect } from "react-redux";
import { Label } from "react-bootstrap";
import RequiredScreenings from '../screening/RequiredScreenings';
import patientActions from '../patient/patientActions';


class CheckInComplete extends React.Component {

  componentWillUnmount(){
    this.props.dispatch(patientActions.clearPatientSelected());
  }

  render() {
    return (
      <div>
        <h3><Label>Next steps</Label></h3>
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

export default connect(mapStateToProps)(CheckInComplete);
