import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

class PatientHeader extends React.Component {


  render() {
      if ( this.props.patient
        && (typeof this.props.patient !== 'undefined')
        && (typeof this.props.patient.name !== 'undefined') ) {
      return (

        <div className="patient-header ">

          <div className="demographics">
            <h1 className="name">
              <span>
                <span className="PersonName-givenName">{this.props.patient.name.givenName}&nbsp;&nbsp;</span>
                <em>Given</em>
              </span>

              {
                this.props.patient.middleName &&
                <span>
                  <span className="PersonName-middleName">{this.props.patient.name.middleName}&nbsp;&nbsp;</span>
                  <em>Middle</em>
                </span>
              }

              <span>
                <span className="PersonName-familyName">{this.props.patient.name.familyName}</span>
                <em>Family Name</em>
              </span>

              &nbsp;
              <span className="gender-age">
                <span>{this.props.patient.gender === 'M' ? "Male" : "Female"}&nbsp;</span>
                <span>
                  {this.props.patient.age} year(s) ({dateFns.format(new Date(this.props.patient.birthdate), 'DD[.]MMM[.]YYYY')})
                </span>
              </span>
            </h1>
          </div>

          <span>
            <div className="identifiers">
              <em>Patient ID</em>
              <span>{ this.props.patient.identifiers.artNumber }
                <br/>{ this.props.patient.identifiers.eidNumber }
                <br/>{ this.props.patient.identifiers.ncdNumber }
                </span>
              <br />
            </div>
          </span>
        </div>

      );
    } else {
      return (
        <div />
      );
    }

  }
}

PatientHeader.propTypes = {
  patient: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    patient: state.selectedPatient ? state.patients[state.selectedPatient] : null
  };
};

export default connect(mapStateToProps)(PatientHeader);
