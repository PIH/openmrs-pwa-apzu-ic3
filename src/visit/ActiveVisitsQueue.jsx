import Queue from '../queue/Queue';
import { connect } from "react-redux";
import utils from '../utils';
import {push} from "connected-react-router";

class ActiveVisitsQueue extends Queue {
  constructor(props) {
    super(props);
    this.columnDefs =  [
      { headerName: 'uuid', hide: true, field: 'uuid' },
      { headerName: 'patientId', field: 'id' },
      { headerName: 'Given Name', field: 'name.givenName' },
      { headerName: 'Family Name', field: 'name.familyName' },
      { headerName: 'Gender', field: 'gender' },
      { headerName: 'Age', field: 'age' },
      { headerName: 'Checked-in Time', valueGetter: function getCheckedInTime(params) {
        return utils.getPatientCheckedInTime(params.data);
      }
      }
    ];
  }

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
