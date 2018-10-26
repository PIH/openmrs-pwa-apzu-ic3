import React from "react";
import { connect } from "react-redux";
import { Label, ButtonToolbar, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import {patientActions, selectors} from '@openmrs/react-components';
import checkOutActions from "../../checkin/checkOutActions";
import CompletedScreenings from "../CompletedScreenings";
import { push } from "connected-react-router";
import { actions as toastrActions } from "react-redux-toastr";


class NursePage extends React.Component {

  constructor(props) {
    super(props);

    this.formSubmittedActionCreators = [
      () => toastrActions.add({ title: "Patient Check-out", type: "success" })
    ];
    this.formSubmittedActionCreators.push(() => push('/screening/nurse/queue'));
  }

  componentWillUnmount(){
    this.props.dispatch(patientActions.clearSelectedPatient());
  }


  handleCheckOut(){
    this.props.dispatch(
      checkOutActions.checkOutSubmitted(
        this.props.patient,
        this.props.patient.visit,
        this.formSubmittedActionCreators
      )
    );
  }

  render() {
    return (
      <div>
        <Link to={this.props.location.state.queueLink}>
          <Button
            bsSize='large'
            bsStyle='danger'
          >
            Back to Queue
          </Button>
        </Link>
        <h3><Label>Completed Screenings</Label></h3>
        <CompletedScreenings patientUuid={this.props.patient.uuid} />
        <ButtonToolbar>
          <Button
            bsSize="large"
            bsStyle="success"
            onClick={this.handleCheckOut.bind(this)}
            type="submit"
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
    patient: selectors.getSelectedPatientFromStore(state)
  };
};

export default connect(mapStateToProps)(NursePage);
