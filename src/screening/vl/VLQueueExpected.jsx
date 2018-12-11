import React from 'react';
import { connect } from "react-redux";
import {
  patientActions,
  CardList,
  selectors,
  PatientCard,
} from '@openmrs/react-components';

import { PATIENT_IDENTIFIER_FILTERS } from "../../gridConstants";
import vlFilters from "./vlFilters";
import { push } from "connected-react-router";
import utils from "../../utils";

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
    return (
      <div>

        <CardList
          card={ PatientCard }
          dispatch={ this.props.dispatch }
          getPatientIdentifiers={ utils.getPatientIdentifiers }
          filters={ [vlFilters.expected, vlFilters.required] }
          loading={ this.props.updating }
          onMountOtherActionCreators={ [
            () => this.props.dispatch(patientActions.clearSelectedPatient())
          ] }
          optionalFilters={ PATIENT_IDENTIFIER_FILTERS }
          optionalFiltersType='or'
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
    patients: selectors.getPatientStore(state)
  }
};

export default connect(mapStateToProps)(VLQueueExpected);
