import List from '../list/List';
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { visitActions } from '@openmrs/react-components';
import patientActions from '../patient/patientActions';
import utils from "../utils";
import { PATIENT_REPRESENTATION, ENCOUNTER_REPRESENTATION } from '../constants';

class ActiveVisits extends List {

  columnDefs() {
    return [
      { headerName: 'uuid', hide: true, field: 'uuid' },
      { headerName: 'Id', valueGetter: 'data.identifiers[0].identifier' },
      { headerName: 'patientId', field: 'id' },
      { headerName: 'Given Name', field: 'name.givenName' },
      { headerName: 'Family Name', field: 'name.familyName' },
      { headerName: 'Gender', field: 'gender' },
      { headerName: 'Age', field: 'age' },
      { headerName: 'Checked-in Time',
        valueGetter: function getCheckedInTime(params) {
          return utils.getPatientCheckedInTime(params.data);
        }
      }
    ];
  }

  fetchListAction() {
    return visitActions.fetchActiveVisits("custom:(uuid,patient:" + PATIENT_REPRESENTATION + ",encounters:" + ENCOUNTER_REPRESENTATION + ")");
  }

  fetchOtherActions() {
    return [ patientActions.clearPatientSelected() ];
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
    rowData: state.activeVisits
  };
};

export default connect(mapStateToProps)(ActiveVisits);
