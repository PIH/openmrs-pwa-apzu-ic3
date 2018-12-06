import React from 'react';
import { connect } from "react-redux";
import {patientActions, selectors} from '@openmrs/react-components';
import {push} from "connected-react-router";
import { PATIENT_IDENTIFIER_FILTERS } from "../../gridConstants";
import vlFilters from "./vlFilters";
import ScreeningQueue from '../ScreeningQueue';

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
        <ScreeningQueue
          dispatch={this.props.dispatch}
          filters={[vlFilters.expected]}
          onMountOtherActionCreators={ [this.onMountOtherActionCreators] }
          rowData={Object.values( this.props.patients )}
          rowSelectedActionCreators={[patientActions.setSelectedPatient, this.redirectToCheckinPageActionCreator]}
          title=""
          optionalFilters={ PATIENT_IDENTIFIER_FILTERS }
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
