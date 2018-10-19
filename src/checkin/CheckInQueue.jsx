import React from 'react';
import DatePicker from 'react-16-bootstrap-date-picker';
import { Button, ButtonToolbar, Grid, Row, Col,FormGroup, ControlLabel } from 'react-bootstrap';
import {patientActions, List} from '@openmrs/react-components';
import { push } from "connected-react-router";
import { connect } from "react-redux";
import checkInActions from './checkInActions';
import {LOCATION_TYPES} from '../constants';
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
        cellStyle: {'line-height': "26px"},
        cellRenderer: function(params){
          return utils.getPatientIdentifiers(params.data);
        },
        getQuickFilterText: function(params) {
          return utils.getPatientIdentifiers(params.data);
        }
      },
      { headerName: 'Given Name', field: 'name.givenName' },
      { headerName: 'Family Name', field: 'name.familyName' },
      { headerName: 'Gender', field: 'gender' },
      { headerName: 'Age', field: 'age' },
      { headerName: 'Village', field: 'village' },
      { headerName: 'Actions', field: 'actions' },
      {
        headerName: 'Appt Date',
        unSortIcon: true,
        valueGetter: function getApptDate(params) {
          if (params.data.lastAppointmentDate) {
            return utils.formatReportRestDate(params.data.lastAppointmentDate);
          }
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
          filters={checkInFilters.required}
          onMountOtherActionCreators={ [this.onMountOtherActionCreators.bind(this)] }
          rowData={Object.values(this.props.patients)}
          onRowCount={this.props.onRowCount}
          rowSelectedActionCreators={[patientActions.setSelectedPatient, this.redirectToCheckinPageActionCreator.bind(this)]}
          title=""
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.openmrs.session.sessionLocation ? state.openmrs.session.sessionLocation.uuid : LOCATION_TYPES.UnknownLocation,
    patients: state.openmrs.patients
  };
};

export default connect(mapStateToProps)(CheckInQueue);
