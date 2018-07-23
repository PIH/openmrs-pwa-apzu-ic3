import Queue from '../../queue/Queue';
import { connect } from "react-redux";
import { push } from 'connected-react-router';

class NurseQueue extends Queue {

  redirectToInfoPageActionCreator() {
    return push('');
  }

  title() {
    return "Nurse Evaluation";
  }

}

const mapStateToProps = (state) => {
  return {
    rowData: state.screening.nurseQueue.list
  };
};

export default connect(mapStateToProps)(NurseQueue);
