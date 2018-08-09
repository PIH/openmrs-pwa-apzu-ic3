import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import patientActions from '../patient/patientActions';

class HomePage extends React.Component {

  componentDidMount() {
    this.props.dispatch(patientActions.clearPatientSelected());
  }

  render() {
    return (
      <div className="App">
        <Grid>
          <div>
            <Link to="/searchPatient">
              <Button size="large" variant="contained">
                Search Patient
              </Button>
            </Link>
            <Link to="/checkin/checkInTabs">
              <Button size="large" variant="contained">
                Check-In
              </Button>
            </Link>
            <Link to="/screening/bloodPressure/queue">
              <Button size="large" variant="contained">
                Blood Pressure Screening
              </Button>
            </Link>
            <Link to="/screening/nutrition/queue">
              <Button size="large" variant="contained">
                Nutrition Screening
              </Button>
            </Link>
            <Link to="/screening/nurse/queue">
              <Button size="large" variant="contained">
                Nurse Evaluation
              </Button>
            </Link>
          </div>
        </Grid>
      </div>
    );
  }
}

export default connect()(HomePage);
