import List from '../../list/List';
import { connect } from "react-redux";
import { push } from 'connected-react-router';

class NurseQueue extends List {

  redirectToInfoPageActionCreator() {
    return push('');
  }

  title() {
    return "Nurse Evaluation";
  }

}

const mapStateToProps = (state) => {
  return {
    rowData: state.screening.nurseQueue
  };
};

export default connect(mapStateToProps)(NurseQueue);
