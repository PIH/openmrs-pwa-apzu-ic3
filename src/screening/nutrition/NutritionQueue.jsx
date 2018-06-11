import Queue from '../Queue';
import { connect } from "react-redux";

// TODO can we skip "results" sub-mapping?

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    rowData: state.screening.nutritionQueue.results
  };
};

export default connect(mapStateToProps)(Queue);
