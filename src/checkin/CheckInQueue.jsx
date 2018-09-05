import React from 'react';
import DatePicker from 'react-16-bootstrap-date-picker';
import { Button, ButtonToolbar, Grid, Row, Col,FormGroup, ControlLabel } from 'react-bootstrap';
import { List } from '@openmrs/react-components';
import { push } from "connected-react-router";
import { connect } from "react-redux";
import patientActions from '../patient/patientActions';
import checkInActions from './checkInActions';
import { LOCATION_TYPES, PATIENT_REPRESENTATION } from '../constants';
import utils from "../utils";
import checkInFilters from './checkInFilters';

class CheckInQueue extends React.Component {

  constructor(props) {
    super(props);
    this.columnDefs =  [
      { headerName: 'uuid', hide: true, field: 'uuid' },
      {
        headerName: 'Id',
        autoHeight: true,
        cellRenderer: function(params){
          return utils.getPatientIdentifiers(params.data);
        }
      },
      { headerName: 'Given Name', field: 'name.givenName' },
      { headerName: 'Family Name', field: 'name.familyName' },
      { headerName: 'Gender', field: 'gender' },
      { headerName: 'Age', field: 'age' },
      { headerName: 'Village', field: 'village' },
      { headerName: 'Actions', field: 'actions' },
      { headerName: 'Alert', field: 'alert' },
      { headerName: 'Checked-in Time', valueGetter: function getCheckedInTime(params) {
        return utils.getPatientCheckedInTime(params.data);
      }
      }
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
    this.props.dispatch(checkInActions.getExpectedToCheckIn(this.props.location, utils.formatReportRestDate(this.state.appointmentDate)));

  };

  onMountOtherActionCreators() {
    this.props.dispatch(patientActions.clearPatientSelected());
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
          filters={checkInFilters.required}
          onMountOtherActionCreators={ [this.onMountOtherActionCreators.bind(this)] }
          rowData={Object.values(this.props.patients)}
          onRowCount={this.props.onRowCount}
          rowSelectedActionCreators={ [this.redirectToCheckinPageActionCreator.bind(this)] }
          title=""
        />
      </div>
    );
  }
}

CheckInQueue.defaultProps = {
  representation: "custom:" + PATIENT_REPRESENTATION
};

const mapStateToProps = (state) => {
  return {
    location: state.openmrs.session.sessionLocation ? state.openmrs.session.sessionLocation.uuid : LOCATION_TYPES.UnknownLocation,
    patients: state.patients
  };
};

export default connect(mapStateToProps)(CheckInQueue);
