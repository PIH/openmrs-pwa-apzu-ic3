import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import {selectors} from '@openmrs/react-components';
import ScreeningTabs from "../ScreeningTabs";
import nutritionFilters from './nutritionFilters';

// TODO can we figure out a better way to do this without passing dispatch all the way through?

let NutritionQueue = props => {

  const rowSelectedActionCreators = [
    () => push('/screening/nutrition/form')
  ];

  return (
    <div>
      <ScreeningTabs
        dispatch={ props.dispatch }
        filters={ nutritionFilters }
        rowData={ Object.values(props.patients) }
        rowSelectedActionCreators={ rowSelectedActionCreators }
        title="Nutrition Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: selectors.getPatientStore(state)
  };
};

export default connect(mapStateToProps)(NutritionQueue);
