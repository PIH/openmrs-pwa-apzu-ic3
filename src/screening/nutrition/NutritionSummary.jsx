import React from "react";
import * as R from "ramda";
import {ObsHistory, selectors} from "@openmrs/react-components";
import connect from "react-redux/es/connect/connect";
import {CONCEPTS} from "../../constants";

class NutritionSummary extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      obs: [],
      loading: true
    };
  }

  componentDidMount() {
    this.updateObs();
  }

  componentDidUpdate(prevProps) {
    if (R.path(['patient', 'uuid'], prevProps) !== R.path(['patient', 'uuid'], this.props) ||
      (prevProps.isPatientStoreUpdating && !this.props.isPatientStoreUpdating) ||
      (prevProps.obs !== this.props.obs))  {
      this.updateObs();
    }
  }

  // we load the nutrition info from our REST endpoint that calculates BMI on the fly
  updateObs() {
    const { obs, isPatientStoreUpdating } = this.props;
    this.setState({
      obs,
      loading: isPatientStoreUpdating
    });
  }

  render() {
    return (
      <ObsHistory
        obs={this.state.obs}
        loading={this.state.loading}
        concepts={[CONCEPTS.Weight, CONCEPTS.Height, CONCEPTS.BMI, CONCEPTS.Pregnant, CONCEPTS.MUAC]}
      />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    patient: selectors.getSelectedPatientFromStore(state),
    isPatientStoreUpdating: selectors.isPatientStoreUpdating(state),
    obs: state.patientNutrition.history,
  };
};

export default connect(mapStateToProps)(NutritionSummary);
