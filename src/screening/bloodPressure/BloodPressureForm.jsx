import React from 'react';
import { connect } from 'react-redux';

class BloodPressureScreeningForm extends React.Component {

  render() {
    return (
      <div>
        Blood Pressure Form
      </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    patient: state.selected.patient
  };
};

export default connect(mapStateToProps)(BloodPressureScreeningForm);
