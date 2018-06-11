import Queue from '../../queue/Queue';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    dispatch: state.dispatch,
    rowData: state.screening.bloodPressureQueue.list
  };
};

export default connect(mapStateToProps)(Queue);
