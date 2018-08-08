import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import RequiredScreenings from '../screening/RequiredScreenings';
import patientActions from '../patient/patientActions';
import CompletedScreenings from "../screening/CompletedScreenings";


class CheckInComplete extends React.Component {

  componentWillUnmount(){
    this.props.dispatch(patientActions.clearPatientSelected());
  }

  render() {
    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant="headline">
              Completed Screenings
            </Typography>
            <CompletedScreenings patientUuid={this.props.patient.uuid} />
            <Typography variant="headline">
              Next Steps
            </Typography>
            <RequiredScreenings patientUuid={this.props.patient.uuid} />
            <Link to={this.props.location.state.queueLink}>
              <Button size='large' variant="contained">
                Back to Queue
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    patient: state.selectedPatient.patient.patient
  };
};

export default connect(mapStateToProps)(CheckInComplete);
