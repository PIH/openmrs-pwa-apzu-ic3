import React from 'react';
import { connect } from 'react-redux';
import {Obs} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import '../../assets/css/tabs.css';
import { leftTextAlign } from "../../pwaStyles";
import ScreeningForm from "../ScreeningForm";

let AdherenceForm = (props) => {

  const formContent = (
    <Grid>

      <Row>
        <FormGroup controlId="formAdherenceSession">
          <Col componentClass={ControlLabel} sm={2}>
            { CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.name }
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
      <Row>
        <FormGroup controlId="formAdherenceCounselor">
          <Col componentClass={ControlLabel} sm={2}>
            { CONCEPTS.ADHERENCE_COUNSELING.NameOfCounselor.name }
          </Col>
          <Col sm={8}>
            <Obs
              concept={ CONCEPTS.ADHERENCE_COUNSELING.NameOfCounselor.uuid }
              datatype="text"
              path="adherence-counselor"
              placeholder="Enter the name of the counselor"
            />
          </Col>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup controlId="formCounseledOnPillCounts">
          <Col componentClass={ControlLabel} sm={2}>
            { CONCEPTS.ADHERENCE_COUNSELING.CounseledOnPillCounts.name }
          </Col>
          <Col sm={8}>
            <Obs
              concept={CONCEPTS.ADHERENCE_COUNSELING.CounseledOnPillCounts.uuid}
              path="adherence-counseled-on-pill-counts"
              conceptAnswers={ FORM_ANSWERS.trueFalse }
            />
          </Col>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup controlId="formAdherencePercentage">
          <Col componentClass={ControlLabel} sm={2}>
            { CONCEPTS.ADHERENCE_COUNSELING.DrugAdherencePercentage.name }
          </Col>
          <Col sm={2}>
            <Obs
              concept={ CONCEPTS.ADHERENCE_COUNSELING.DrugAdherencePercentage.uuid }
              path="adherence-percentage"
              placeholder="Enter percentage"
            />
          </Col>
          <Col componentClass={ControlLabel} sm={2} style={ leftTextAlign }>
            %
          </Col>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup controlId="formCounseledOnVL">
          <Col componentClass={ControlLabel} sm={2}>
            { CONCEPTS.ADHERENCE_COUNSELING.CounseledOnViralLoad.name }
          </Col>
          <Col sm={8}>
            <Obs
              concept={CONCEPTS.ADHERENCE_COUNSELING.CounseledOnViralLoad.uuid}
              path="adherence-counseled-on-vl"
              conceptAnswers={ FORM_ANSWERS.trueFalse }
            />
          </Col>
        </FormGroup>
      </Row>
    </Grid>
  );

  return (
    <ScreeningForm
      encounterType={ ENCOUNTER_TYPES.AdherenceCounselingEncounterType }
      formContent={formContent}
      formId="adherence-form"
      title="Adherence Counseling"
    />
  );
};

export default connect(state => {
  return {
    patient: state.openmrs.selectedPatient ? state.openmrs.patients[state.openmrs.selectedPatient] : null
  };
})(AdherenceForm);

