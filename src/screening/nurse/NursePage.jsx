import React from "react";
import { connect } from "react-redux";
import { Label, ButtonToolbar, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import patientActions from "../../patient/patientActions";
import checkOutActions from "../../checkin/checkOutActions";
import CompletedScreenings from "../CompletedScreenings";
import {push} from "connected-react-router";
import {actions as toastrActions} from "react-redux-toastr";


class NursePage extends React.Component {

  componentWillUnmount(){
    this.props.dispatch(patientActions.clearPatientSelected());
  }

  checkOutSubmittedActionCreators() {
    return [
      () => toastrActions.add({ title: "Patient Check-out", type: "success" }),
      () => push(this.props.location.state.queueLink)
    ];
  }

  handleCheckOut(){
    this.props.dispatch(
      checkOutActions.checkOutSubmitted(
        this.props.patient,
        this.props.patient.visit,
        this.checkOutSubmittedActionCreators()
      )
    );
  }

  render() {
    return (
      <div>
        <Link to={this.props.location.state.queueLink}>
          <Button bsSize='large' bsStyle='danger'>
            Back to Queue
          </Button>
        </Link>
        <h3><Label>Completed Screenings</Label></h3>
        <CompletedScreenings patientUuid={this.props.patient.uuid} />
        <h3><Label>Next steps</Label></h3>
{/*        <RequiredScreenings patientUuid={this.props.patient.uuid} />*/}
        <ButtonToolbar>
          <Button
            bsSize="large"
            bsStyle="success"
            type="submit"
            onClick={ this.handleCheckOut.bind(this) }
          >
            Check-out
          </Button>

        </ButtonToolbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    patient: state.selectedPatient ? state.patients[state.selectedPatient] : null
  };
};

export default connect(mapStateToProps)(NursePage);
