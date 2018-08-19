import React from "react";
import { connect } from "react-redux";
import HtcForm from './HtcForm';
import { push } from "connected-react-router";
import { ENCOUNTER_TYPES, CONCEPTS } from '../../constants';
import { formActions } from '@openmrs/react-components';
import {actions as toastrActions} from "react-redux-toastr";

class HtcPage extends React.Component {

  constructor(props) {
    super(props);
    this.formSubmittedActionCreators =
      [
        () => toastrActions.add({ title: "HTC Results Submitted", type: "success" }),
        () => push('/screening/htc/queue')
      ];
  };


  handleHtcFormSubmit(values) {
    if (typeof values !== 'undefined' && values !== null && values.htcResults) {
      let obs = 'obs|path=htc|concept=' + CONCEPTS.HTC_RESULTS.uuid ;
      let obsObject = {};
      obsObject[obs] = values.htcResults ;

      this.props.dispatch(formActions.formSubmitted(
        obsObject,
        this.props.patient,
        ENCOUNTER_TYPES.HTCEncounterType,
        this.props.patient.visit,
        this.formSubmittedActionCreators));
    }
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
