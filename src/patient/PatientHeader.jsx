import React from "react";
import { connect } from "react-redux";
import dateFns from 'date-fns';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class PatientHeader extends React.Component {


  render() {
    if (this.props.patient) {
      return (

        <div>
          <Card>
            <CardContent>
              <Typography variant="headline">
                {this.props.patient.name.givenName} { this.props.patient.middleName && this.props.patient.name.middleName} {this.props.patient.name.familyName}  {this.props.patient.identifiers[0].identifier}
              </Typography>
              <Typography variant="subheading">
                {this.props.patient.gender === 'M' ? "Male" : "Female"}, {this.props.patient.age} year(s) ({dateFns.format(new Date(this.props.patient.birthdate), 'DD[.]MMM[.]YYYY')})
              </Typography>
            </CardContent>
          </Card>
        </div>

      );
    } else {
      return (
        <div />
      );
    }

  }
}

const mapStateToProps = (state) => {
  return {
    patient: state.selectedPatient.patient.patient
  };
};

export default connect(mapStateToProps)(PatientHeader);
