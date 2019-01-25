import React from "react";
import * as R from "ramda";
import {ObsHistory, selectors} from "@openmrs/react-components";
import connect from "react-redux/es/connect/connect";
import reportingRest from '../../rest/reportingRest';
import {CONCEPTS} from "../../constants";

class NutritionSummary extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      obs: []
    };
  }

  componentDidMount() {
    this.updateObs();
  }

  componentDidUpdate(prevProps) {
    if (R.path(['patient', 'uuid'], prevProps) !== R.path(['patient', 'uuid'], this.props) ||
      (prevProps.isPatientStoreUpdating && !this.props.isPatientStoreUpdating)) {
      this.updateObs();
    }
  }

  // we load the nutrition info from our REST endpoint that calculates BMI on the fly
  updateObs() {
    // TODO update so this actually gets handled stored in the redux store?
    reportingRest.getIC3NutritionHistory({ patient: this.props.patient.uuid })
      .then(data => {
        this.setState({
          obs: data
        });
      });
  }

  render() {
    return (
      <ObsHistory
        obs={this.state.obs}
        concepts={[CONCEPTS.Height, CONCEPTS.Weight, CONCEPTS.BMI, CONCEPTS.Pregnant, CONCEPTS.MUAC]}
      />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
    isPatientStoreUpdating: selectors.isPatientStoreUpdating(state)
  };
};

export default connect(mapStateToProps)(NutritionSummary);
