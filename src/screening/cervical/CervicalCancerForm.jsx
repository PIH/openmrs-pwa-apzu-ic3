import React from 'react';
import { connect } from 'react-redux';
import {Obs, ObsGroup, selectors} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS} from "../../constants";
import '../../assets/css/tabs.css';
import ScreeningForm from "../ScreeningForm";

let CervicalCancerForm = (props) => {

  const formContent = (
    <Grid>
      <Row>
        <Col componentClass={ControlLabel}>
          Screening Results
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <FormGroup controlId="formCervicalCancer">
            <ObsGroup
              groupingConcept={CONCEPTS.CERVICAL_CANCER_SCREENING_CONSTRUCT}
              path="cervical-cancer-screening-construct"
            >
              <Obs
                concept={CONCEPTS.CERVICAL_CANCER_SCREENING_RESULTS.uuid}
                conceptAnswers={FORM_ANSWERS.cervicalCancerResultAnswers}
                path="cervical-cancer-results"
              />

            </ObsGroup>
          </FormGroup>
        </Col>
      </Row>
    </Grid>
  );

  return (
    <ScreeningForm
      backLink={props.backLink}
      encounterType={ENCOUNTER_TYPES.CervicalCancerScreeningEncounterType}
      formContent={formContent}
      formId="cervical-cancer-form"
      formInstanceId={props.formInstanceId}
      toastMessage="Cervical Cancer Saved"
    />
  );
};

export default connect(state => {
  return {
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(CervicalCancerForm);

