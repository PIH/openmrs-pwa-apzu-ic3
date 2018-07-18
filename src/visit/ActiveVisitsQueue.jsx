import Queue from '../queue/Queue';
import { connect } from "react-redux";
import utils from '../utils';
import {push} from "connected-react-router";

class ActiveVisitsQueue extends Queue {

  redirectToInfoPageActionCreator() {
    return push({
      pathname: '/checkin/checkInComplete',
      state: {
        queueLink: '/visit/queue'
      }
    });
  }

  title() {
    return "Active Visits";
  }
}

const mapStateToProps = (state) => {
  return {
    rowData: state.screening.activeVisitsQueue.list
  };
};

export default connect(mapStateToProps)(ActiveVisitsQueue);
