import React from 'react';
import { connect } from "react-redux";
import {
  patientActions,
  CardList,
  selectors,
  PatientCard,
} from '@openmrs/react-components';

import vlFilters from "./vlFilters";
import { push } from "connected-react-router";
import utils from "../../utils";
import ic3PatientActions from '../../patient/patientActions';

class VLQueueExpected extends React.Component {

  constructor(props) {
    super(props);

    this.onMountOtherActionCreators = this.onMountOtherActionCreators.bind(this);
    this.redirectToCheckinPageActionCreator = this.redirectToCheckinPageActionCreator.bind(this);
  }

  onMountOtherActionCreators() {
    this.props.dispatch(patientActions.clearSelectedPatient());
  }

  redirectToCheckinPageActionCreator() {
    return push('/checkin/checkInPage');
  }

  render() {
    const fetchListActionCreator = this.props.fetchListActionCreator ? this.props.fetchListActionCreator :
      () => {
        if (!this.props.updating) {
          this.props.dispatch(ic3PatientActions.getIC3Patients(
            this.props.session.sessionLocation ? this.props.session.sessionLocation.uuid : null, utils.formatReportRestDate(new Date())
          ));
        }
      };
    return (
      <div>
        <CardList
          card={PatientCard}
          delayInterval={0}
          dispatch={this.props.dispatch}
          fetchListActionCreator={fetchListActionCreator}
          filters={[vlFilters.expected, vlFilters.required]}
          getPatientIdentifiers={utils.getPatientIdentifiers}
          loading={this.props.updating}
          onMountOtherActionCreators={[
            () => this.props.dispatch(patientActions.clearSelectedPatient())
          ] }
          rowData={ Object.values(this.props.patients) }
          rowSelectedActionCreators={ [patientActions.setSelectedPatient, this.redirectToCheckinPageActionCreator] }
          title=""
        />

      </div>


    );
  }
}

const mapStateToProps = (state) => {
  return {
    patients: selectors.getPatientStore(state),
    session: state.openmrs.session,
    updating: selectors.isPatientStoreUpdating(state)
  };
};

export default connect(mapStateToProps)(VLQueueExpected);
