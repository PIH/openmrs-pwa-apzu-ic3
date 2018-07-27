import List from '../list/List';
import { connect } from "react-redux";
import { push } from "connected-react-router";

class ActiveVisits extends List {

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
    rowData: state.activeVisits
  };
};

export default connect(mapStateToProps)(ActiveVisits);
