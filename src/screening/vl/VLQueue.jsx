import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import { selectors } from '@openmrs/react-components';
import ScreeningQueue from "../ScreeningQueue";
import vlFilters from './vlFilters';
import screeningActions from '../actions/actions';

let VLQueue = props => {

  const rowSelectedActionCreators = [
    () => push('/screening'),
    () => screeningActions.setLastScreeningQueue(props.location)
  ];

  return (
    <div>
      <ScreeningQueue
        dispatch={props.dispatch}
        filters={[vlFilters.required, (patient) => !vlFilters.completed(patient)]}
        rowData={Object.values(props.patients)}
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="Viral Load Queue"
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

export default connect(mapStateToProps)(VLQueue);
