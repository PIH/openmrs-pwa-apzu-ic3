import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import { selectors } from '@openmrs/react-components';
import ScreeningTabs from "../ScreeningTabs";
import htcFilters from './htcFilters';


let HtcQueue = props => {

  const rowSelectedActionCreators = [
    () => push('/screening/htc/form')
  ];

  return (
    <div>
      <ScreeningTabs
        dispatch={ props.dispatch }
        filters={ htcFilters }
        rowData={ Object.values(props.patients) }
        rowSelectedActionCreators={ rowSelectedActionCreators }
        tabsId="htc-tabs"
        title="HTC Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: selectors.getPatientStore(state)
  };
};

export default connect(mapStateToProps)(HtcQueue);
