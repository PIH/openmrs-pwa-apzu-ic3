import React from 'react';
import { connect } from 'react-redux';
import { Obs, EncounterFormPage } from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import '../../assets/css/tabs.css';

let AdherenceForm = (props) => {

  const formContent = (
    <Grid>

      <Row>
        <FormGroup controlId="formAdherence">
          <Col componentClass={ControlLabel} sm={2}>
            Adherence session
          </Col>
          <Col sm={8}>
            <Obs
              concept={CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.uuid}
              path="adherence-session"
              conceptAnswers={ FORM_ANSWERS.adherenceSession }
            />
          </Col>
        </FormGroup>
      </Row>
    </Grid>
  );

  return (
    <EncounterFormPage
      afterSubmitLink={ props.afterSubmitLink ? props.afterSubmitLink : "/screening/adherence/queue" }
      backLink={ props.backLink ? props.backLink : "/screening/adherence/queue" }
      encounterType={ ENCOUNTER_TYPES.AdherenceCounselingEncounterType }
      formContent={formContent}
      formId="adherence-form"
      title="Adherence Counseling"
    />
  );
};

export default connect(state => {
  return {
    patient: state.selectedPatient ? state.patients[state.selectedPatient] : null
  };
})(AdherenceForm);

