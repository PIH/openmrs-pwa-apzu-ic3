import React from "react";
import * as R from "ramda";
import { formActions, ObsHistory, selectors } from "@openmrs/react-components";
import connect from "react-redux/es/connect/connect";
import { CONCEPTS, ENCOUNTER_TYPES } from "../../constants";

class NutritionSummary extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      obs: [],
    };
  }

  componentDidMount() {
    this.updateObs();
  }

  componentDidUpdate(prevProps) {
    if (R.path(['patient', 'uuid'], prevProps) !== R.path(['patient', 'uuid'], this.props) ||
      (prevProps.obs !== this.props.obs))  {
      this.updateObs();
    }
  }

  // we load the nutrition info from our REST endpoint that calculates BMI on the fly
  updateObs() {
    const { obs } = this.props;
    this.setState({
      obs
    });
  }

  render() {
    return (
      <div className="single-summary-content">

        <ObsHistory
          concepts={[CONCEPTS.Weight, CONCEPTS.Height, CONCEPTS.BMI, CONCEPTS.Pregnant, CONCEPTS.MUAC]}
          editableEncounterTypes={[ENCOUNTER_TYPES.NutritionEncounterType]}
          obs={this.state.obs}
          onEditEncounterActionCreators={[
            (encounterUuid) => formActions.loadFormBackingEncounter(this.props.formInstanceId, encounterUuid)
          ]}
          onEditEncounterCallbacks={[
            this.props.gotoForm
          ]}
        />
      </div>
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
