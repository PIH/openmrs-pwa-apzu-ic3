import React from 'react';
import { connect } from 'react-redux';
import { OpenMRSForm, Submit } from '@openmrs/react-components';
import { Grid, Row, Label } from 'react-bootstrap';
import Form from '../../form/Form';
import { ENCOUNTER_TYPES } from "../../constants";

class NutritionForm extends Form {

  queueLink() {
    return "/screening/nutrition/queue";
  }

  // TODO correct encounter type

  formContent() {
    return (
      <div>
        <h3><Label>Nutrition</Label></h3>
        <OpenMRSForm
          encounterType={ENCOUNTER_TYPES.NutritionEncounterType}
          formSubmittedActionCreator={this.formSubmittedActionCreators}
          patient={this.props.patient}
          visit={this.props.visit}>
          <Grid>
            <Row>

            </Row>
            <Row>
              <Submit />
            </Row>
          </Grid>
        </OpenMRSForm>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    patient: state.selected.patient,
    visit: {
      uuid: state.selected.patient.activeVisit
    }
  };
};

export default connect(mapStateToProps)(NutritionForm);
