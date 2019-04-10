import React from 'react';
import { connect } from 'react-redux';
import {Obs, ObsGroup, selectors} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import {ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS} from "../../constants";
import '../../assets/css/tabs.css';
import ScreeningForm from "../ScreeningForm";

let HtcForm = (props) => {

  const formContent = (
    <Grid>
      <Row>
        <Col componentClass={ControlLabel}>
          Results
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <FormGroup controlId="formHtc">
            <ObsGroup
              groupingConcept={CONCEPTS.HIV_TEST_CONSTRUCT}
              path="htc-test-construct"
            >
              <Obs
                concept={CONCEPTS.HIV_TEST_RESULTS.uuid}
                conceptAnswers={FORM_ANSWERS.hivTestResultAnswers}
                path="htc-results"
              />
              <span style={{ display: 'none' }}>
                <Obs
                  concept={CONCEPTS.HIV_TEST_TYPE}
                  conceptAnswers={[CONCEPTS.HIV_RAPID_TEST]}
                  path="htc-test-type"
                />
              </span>
            </ObsGroup>
          </FormGroup>
        </Col>
      </Row>
    </Grid>
  );

  return (
    <ScreeningForm
      backLink={props.backLink}
      defaultValues={[{
        type: "obs",
        path: ["htc-test-construct", "htc-test-type"],
        conceptPath: [CONCEPTS.HIV_TEST_CONSTRUCT.uuid, CONCEPTS.HIV_TEST_TYPE.uuid],
        value: CONCEPTS.HIV_RAPID_TEST.uuid
      }]}
      encounterType={ENCOUNTER_TYPES.HTCEncounterType}
      formContent={formContent}
      formId="htc-form"
      formInstanceId={props.formInstanceId}
      toastMessage="HTC Saved"
    />
  );
};

export default connect(state => {
  return {
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(HtcForm);

