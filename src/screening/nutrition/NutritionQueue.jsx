import List from '../../list/List';
import { connect } from "react-redux";
import { push } from 'connected-react-router';

class NutritionQueue extends List {

  redirectToInfoPageActionCreator() {
    return push('/screening/nutrition/form');
  }

  title() {
    return "Nutrition Queue";
  }

}

const mapStateToProps = (state) => {
  return {
    rowData: state.screening.nutritionQueue
  };
};

export default connect(mapStateToProps)(NutritionQueue);
