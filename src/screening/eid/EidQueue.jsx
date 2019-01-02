import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import { selectors } from '@openmrs/react-components';
import ScreeningQueue from "../ScreeningQueue";
import eidFilters from './eidFilters';
import screeningActions from '../actions/actions';

const EidQueue = props => {
  const rowSelectedActionCreators = [
    () => push('/screening'),
    () => screeningActions.setLastScreeningQueue(props.location)
  ];
  return (
    <div>
      <ScreeningQueue
        dispatch={props.dispatch}
        filters={[eidFilters.required, (patient) => !eidFilters.completed(patient)]}
        rowData={Object.values(props.patients)}
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="EID Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: selectors.getPatientStore(state),
    location: state.router.location.pathname
  };
};

export default connect(mapStateToProps)(EidQueue);
