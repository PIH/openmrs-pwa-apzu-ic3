import React from "react";
import { connect } from "react-redux";
import HtcForm from './HtcForm';
import { push } from "connected-react-router";


class HtcPage extends React.Component {

  redirectToQueuePageActionCreator() {
    return push('/screening/htc/queue');
  }

  handleHtcFormSubmit(values) {
    console.log("HTC results have been submitted");
  }

  render() {
    return (
      <div>
        <HtcForm
          patient={ this.props.patient }
          onSubmit={ this.handleHtcFormSubmit.bind(this) }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    patient: state.selectedPatient
  };
};

export default connect(mapStateToProps)(HtcPage);
