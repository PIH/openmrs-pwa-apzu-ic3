import React from 'react';
import DatePicker from 'react-16-bootstrap-date-picker';
import { Button, ButtonToolbar, Grid, Row, Col,FormGroup, ControlLabel } from 'react-bootstrap';
import {patientActions, List, selectors} from '@openmrs/react-components';
import { push } from "connected-react-router";
import { connect } from "react-redux";
import {LOCATION_TYPES} from '../constants';
import utils from "../utils";
import { COLUMN_DEFS, BASIC_GRID, PATIENT_IDENTIFIER_FILTERS } from "../gridConstants";
import checkInFilters from './checkInFilters';
import ic3PatientActions from '../patient/patientActions';

class CheckInQueue extends React.Component {

  constructor(props) {
    super(props);
    this.columnDefs =  [
      ...BASIC_GRID,
      COLUMN_DEFS.APPOINTMENT_DATE
    ];

    this.state = {
      appointmentDate: new Date().toISOString()
    };

  }


  handleAppointmentDateChange(value, formattedValue) {
    this.setState(() => ({
      appointmentDate: value,
      formattedAppointmentDate: formattedValue
    }));
  }


  getAppointmentReport(){
    this.props.dispatch(patientActions.clearPatientStore());
    this.props.dispatch(ic3PatientActions.getIC3Patients(this.props.location, utils.formatReportRestDate(this.state.appointmentDate), true));  // getExpectedAppoints == true

  };

  onMountOtherActionCreators() {
    this.props.dispatch(patientActions.clearSelectedPatient());
  }
  redirectToCheckinPageActionCreator() {
    return push('/checkin/checkInPage');
  }

  render() {
    return (
      <div>
        <br />

        <Grid>
          <Row>
            <FormGroup controlId="formApptDate">
              <Col
                componentClass={ControlLabel}
                sm={2}
              >Appointment Date</Col>
              <Col sm={2}>
                <DatePicker
                  id="appt-datepicker"
                  onChange={this.handleAppointmentDateChange.bind(this)}
                  value={this.state.appointmentDate}
                />
              </Col>
              <Col sm={2} >
                <ButtonToolbar>
                  <Button
                    bsSize="small"
                    bsStyle="success"
                    onClick={this.getAppointmentReport.bind(this)}
                    type="submit"
                  >
                    Get Appointment Report
                  </Button>
                </ButtonToolbar>
              </Col>
            </FormGroup>
          </Row>
        </Grid>

        <br />

        <List
          columnDefs={ this.columnDefs }
          filters={[(patient) => !checkInFilters.completed(patient)]}
          loading={this.props.updating}
          onMountOtherActionCreators={ [this.onMountOtherActionCreators.bind(this)] }
          rowData={Object.values(this.props.patients)}
          onRowCount={this.props.onRowCount}
          rowSelectedActionCreators={[patientActions.setSelectedPatient, this.redirectToCheckinPageActionCreator.bind(this)]}
          title=""
          optionalFilters={ PATIENT_IDENTIFIER_FILTERS }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.openmrs.session.sessionLocation ? state.openmrs.session.sessionLocation.uuid : LOCATION_TYPES.UnknownLocation,
    patients: selectors.getPatientStore(state),
    updating: selectors.isPatientStoreUpdating(state)
  };
};

export default connect(mapStateToProps)(CheckInQueue);
