import React from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import { selectors } from "@openmrs/react-components";
import ScreeningQueue from "../ScreeningQueue";
import tbTestFilters from './tbTestFilters';


const TBTestQueue = props => {
  const rowSelectedActionCreators = [
    () => push('/screening')
  ];

  console.log('patients', props.patients);
  return (
    <div>
      <ScreeningQueue
        dispatch={props.dispatch}
        filters={[tbTestFilters.required, (patient) => !tbTestFilters.completed(patient)]}
        rowData={Object.values(props.patients)}
        rowSelectedActionCreators={rowSelectedActionCreators}
        title="TB Test Queue"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: selectors.getPatientStore(state),
  };
};

export default connect(mapStateToProps)(TBTestQueue);
