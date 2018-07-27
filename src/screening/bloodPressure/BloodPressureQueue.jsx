import Queue from '../../list/List';
import { connect } from "react-redux";
import { push } from 'connected-react-router';

class BloodPressureQueue extends Queue {

  redirectToInfoPageActionCreator() {
    return push('/screening/bloodPressure/form');
  }

  title() {
    return "Blood Pressure Queue";
  }

}

const mapStateToProps = (state) => {
  return {
    rowData: state.screening.bloodPressureQueue
  };
};

export default connect(mapStateToProps)(BloodPressureQueue);
