import Queue from '../../queue/Queue';
import { connect } from "react-redux";
import { push } from 'connected-react-router';

class NutritionQueue extends Queue {

  redirectToInfoPageActionCreator() {
    return push('/screening/nutrition/form');
  }

  title() {
    return "Nutrition Queue";
  }

}

const mapStateToProps = (state) => {
  return {
    rowData: state.screening.nutritionQueue.list
  };
};

export default connect(mapStateToProps)(NutritionQueue);
