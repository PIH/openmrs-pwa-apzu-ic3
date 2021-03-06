import React from 'react';
import { connect } from 'react-redux';
import {Obs, selectors} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import '../../assets/css/tabs.css';
import './styles/adherence.css';
import ScreeningForm from "../ScreeningForm";

let AdherenceForm = (props) => {

  const formContent = (
    <Grid>
      <Row>
        <Col
          componentClass={ControlLabel}
        >
          {CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.display}
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <FormGroup controlId="formAdherenceSession">
            <Obs
              concept={CONCEPTS.ADHERENCE_COUNSELING.AdherenceSession.uuid}
              conceptAnswers={FORM_ANSWERS.adherenceSession}
              path="adherence-session"
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col
          componentClass={ControlLabel}
        >
          {CONCEPTS.ADHERENCE_COUNSELING.NameOfCounselor.display}
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <FormGroup controlId="formAdherenceCounselor">
            <Obs
              concept={CONCEPTS.ADHERENCE_COUNSELING.NameOfCounselor.uuid}
              datatype="text"
              path="adherence-counselor"
              placeholder="Enter the name of the counselor"
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col
          componentClass={ControlLabel}
        >
          {CONCEPTS.ADHERENCE_COUNSELING.CounseledOnPillCounts.display}
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <FormGroup controlId="formCounseledOnPillCounts">
            <Obs
              concept={CONCEPTS.ADHERENCE_COUNSELING.CounseledOnPillCounts.uuid}
              conceptAnswers={FORM_ANSWERS.yesNo}
              path="adherence-counseled-on-pill-counts"
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col
          componentClass={ControlLabel}
        >
          {CONCEPTS.ADHERENCE_COUNSELING.DrugAdherencePercentage.display}
        </Col>
      </Row>
      <Row>
        <Col xs={1}>
          <FormGroup
            controlId="formAdherencePercentage" 
            style={{ width: 75 }}
          >
            <Obs
              concept={CONCEPTS.ADHERENCE_COUNSELING.DrugAdherencePercentage.uuid}
              path="adherence-percentage"
              required
            />
          </FormGroup>
        </Col>
        <Col
          className="obs-unit"
          componentClass="span"
          xs={1}
        >
          %
        </Col>
      </Row>

      <Row>
        <Col
          componentClass={ControlLabel}
        >
          {CONCEPTS.ADHERENCE_COUNSELING.MissedDosesLastWeek.display}
        </Col>
      </Row>
      <Row>
        <Col sm={1}>
          <FormGroup
            controlId="formAdherenceMissedDoses"
            style={{ width: 150 }}
          >
            <Obs
              concept={CONCEPTS.ADHERENCE_COUNSELING.MissedDosesLastWeek.uuid}
              path="adherence-missed-doses"
              placeholder="Enter missed doses"
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col
          componentClass={ControlLabel}
        >
          {CONCEPTS.ADHERENCE_COUNSELING.CounseledOnViralLoad.display}
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <FormGroup controlId="formCounseledOnVL">
            <Obs
              concept={CONCEPTS.ADHERENCE_COUNSELING.CounseledOnViralLoad.uuid}
              conceptAnswers={FORM_ANSWERS.yesNo}
              path="adherence-counseled-on-vl"
            />
          </FormGroup>
        </Col>
      </Row>

    </Grid>
  );

  return (
    <ScreeningForm
      backLink={props.backLink}
      encounterType={ENCOUNTER_TYPES.AdherenceCounselingEncounterType}
      formContent={formContent}
      formId="adherence-form"
      formInstanceId={props.formInstanceId}
      toastMessage="Adherence Counseling Saved"
    />
  );
};

export default connect(state => {
  return {
    patient: selectors.getPatientStore(state)
  };
})(AdherenceForm);

