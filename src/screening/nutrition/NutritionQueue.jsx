import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import { selectors } from '@openmrs/react-components';
import nutritionFilters from './nutritionFilters';
import ScreeningQueue from "../ScreeningQueue";
import screeningActions from '../actions/actions';

// TODO can we figure out a better way to do this without passing dispatch all the way through?

let NutritionQueue = props => {

  const rowSelectedActionCreators = [
    () => push('/screening'),
    () => screeningActions.setLastScreeningQueue(props.location)
  ];

  return (
    <div>
      <ScreeningQueue
        dispatch={props.dispatch}
        filters={[nutritionFilters.required, (patient) => !nutritionFilters.completed(patient)]}
        rowData={Object.values(props.patients)}
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="Nutrition Queue"
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

export default connect(mapStateToProps)(NutritionQueue);
