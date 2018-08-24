import React from 'react';
import { connect } from "react-redux";
import { LOCATION_TYPES } from '../constants';
import patientActions from '../patient/patientActions';
import homeImage from "../assets/images/Malawi_0216_HMHC-6weekANC_JDrake_033-webbig.jpg";

class HomePage extends React.Component {

  componentDidMount() {
    this.props.dispatch(patientActions.clearPatientSelected());
  }

  render() {
    return (
      <div className="App">
        <div>
          <img className="homeImage"
               alt=""
               src={homeImage}
          />
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.openmrs.session.sessionLocation ? state.openmrs.session.sessionLocation.uuid : LOCATION_TYPES.UnknownLocation
  };
};


export default connect(mapStateToProps)(HomePage);
