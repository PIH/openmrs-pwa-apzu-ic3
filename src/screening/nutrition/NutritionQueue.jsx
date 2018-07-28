import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import ScreeningQueue from "../ScreeningQueue";

// TODO can we figure out a better way to do this without passing dispatch all the way through?

let NutritionQueue = props => {

  const rowSelectedActionCreators = [
    () => push('/screening/nutrition/form')
  ];

  return (
    <div>
      <ScreeningQueue
        dispatch={props.dispatch}
        rowData={props.rowData}
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="Nutrition Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    rowData: state.screening.nutritionQueue,
  };
};

export default connect(mapStateToProps)(NutritionQueue);
