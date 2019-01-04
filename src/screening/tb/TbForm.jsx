/* eslint-disable */

import React from 'react';
import {connect} from 'react-redux';
import {formUtil, Obs} from '@openmrs/react-components';
import {change, formValueSelector, untouch} from "redux-form";
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import ScreeningForm from "../ScreeningForm";
import { padding, setFlex } from "../../pwaStyles";


class TbForm extends React.Component {

  componentDidUpdate(prevProps) {

    // make sure that we can't have both present and absent checked at the same time
    // ideally, the form entry technology would have some built in support for this
    if (this.props.coughPresent !== prevProps.coughPresent && this.props.coughPresent === CONCEPTS.TB.Cough.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-cough-absent', CONCEPTS.SymptomAbsent.uuid), null));
      this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-cough-absent', CONCEPTS.SymptomAbsent.uuid)));
    }

    if (this.props.coughAbsent !== prevProps.coughAbsent && this.props.coughAbsent === CONCEPTS.TB.Cough.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-cough-present', CONCEPTS.SymptomPresent.uuid), null));
      this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-cough-present', CONCEPTS.SymptomPresent.uuid)));
    }

    if (this.props.feverPresent !== prevProps.feverPresent && this.props.feverPresent === CONCEPTS.TB.Fever.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-fever-absent', CONCEPTS.SymptomAbsent.uuid), null));
      this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-fever-absent', CONCEPTS.SymptomAbsent.uuid)));
    }

    if (this.props.feverAbsent !== prevProps.feverAbsent && this.props.feverAbsent === CONCEPTS.TB.Fever.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-fever-present', CONCEPTS.SymptomPresent.uuid), null));
      this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-fever-present', CONCEPTS.SymptomPresent.uuid)));
    }

    if (this.props.nightSweatPresent !== prevProps.nightSweatPresent && this.props.nightSweatPresent === CONCEPTS.TB.NightSweats.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-night-sweat-absent', CONCEPTS.SymptomAbsent.uuid), null));
      this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-night-sweat-absent', CONCEPTS.SymptomAbsent.uuid)));
    }

    if (this.props.nightSweatAbsent !== prevProps.nightSweatAbsent && this.props.nightSweatAbsent === CONCEPTS.TB.NightSweats.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-night-sweat-present', CONCEPTS.SymptomPresent.uuid), null));
      this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-night-sweat-present', CONCEPTS.SymptomPresent.uuid)));
    }

    if (this.props.weightLossPresent !== prevProps.weightLossPresent && this.props.weightLossPresent === CONCEPTS.TB.WeightLoss.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-weight-loss-absent', CONCEPTS.SymptomAbsent.uuid), null));
      this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-weight-loss-absent', CONCEPTS.SymptomAbsent.uuid)));
    }

    if (this.props.weightLossAbsent !== prevProps.weightLossAbsent && this.props.weightLossAbsent === CONCEPTS.TB.WeightLoss.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-weight-loss-present', CONCEPTS.SymptomPresent.uuid), null));
      this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-weight-loss-present', CONCEPTS.SymptomPresent.uuid)));
    }

    if (this.props.recentContactWithActiveTBPresent !== prevProps.recentContactWithActiveTBPresent && this.props.recentContactWithActiveTBPresent === CONCEPTS.TB.RecentContactWithActiveTB.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-recent-contact-with-active-TB-absent', CONCEPTS.SymptomAbsent.uuid), null));
      this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-recent-contact-with-active-TB-absent', CONCEPTS.SymptomAbsent.uuid)));
    }

    if (this.props.recentContactWithActiveTBAbsent !== prevProps.recentContactWithActiveTBAbsent && this.props.recentContactWithActiveTBAbsent === CONCEPTS.TB.RecentContactWithActiveTB.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-recent-contact-with-active-TB-present', CONCEPTS.SymptomPresent.uuid), null));
      this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-recent-contact-with-active-TB-present', CONCEPTS.SymptomPresent.uuid)));
    }

    if (this.props.painfulNeckAndArmpitLymphTBPresent !== prevProps.painfulNeckAndArmpitLymphTBPresent && this.props.painfulNeckAndArmpitLymphTBPresent === CONCEPTS.TB.PainfulNeckAndArmpitLymphNodes.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-painful-neck-and-armpit-lymph-node-absent', CONCEPTS.SymptomAbsent.uuid), null));
      this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-painful-neck-and-armpit-lymph-node-absent', CONCEPTS.SymptomAbsent.uuid)));
    }

    if (this.props.painfulNeckAndArmpitLymphTBAbsent !== prevProps.painfulNeckAndArmpitLymphTBAbsent && this.props.painfulNeckAndArmpitLymphTBAbsent === CONCEPTS.TB.PainfulNeckAndArmpitLymphNodes.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('tb-painful-neck-and-armpit-lymph-node-present', CONCEPTS.SymptomPresent.uuid), null));
      this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('tb-painful-neck-and-armpit-lymph-node-present', CONCEPTS.SymptomPresent.uuid)));
    }

  }


 render() {
    const formContent = (
      <Grid>
        <br />
          <FormGroup>
            <Row style={padding}>
              <Col xs={7}>
                <div>
                  <ControlLabel xs={1}>
                    Cough
                  </ControlLabel>
                </div>

                <Col xs={8}>
                  <Row style={setFlex}>
                    <Obs
                      concept={CONCEPTS.SymptomPresent}
                      conceptAnswers={FORM_ANSWERS.coughPresent}
                      path="tb-cough-present"
                    />
                    <Obs
                      concept={CONCEPTS.SymptomAbsent}
                      conceptAnswers={FORM_ANSWERS.coughAbsent}
                      path="tb-cough-absent"
                    />
                  </Row>
                </Col>
              </Col>
            </Row>
            <Row style={padding}>
              <Col xs={7}>
                <div>
                  <ControlLabel xs={1}>
                    Fever
                  </ControlLabel>
                </div>
                <Col xs={8}>
                  <Row style={setFlex}>
                    <Obs
                      concept={CONCEPTS.SymptomPresent}
                      conceptAnswers={FORM_ANSWERS.feverPresent}
                      path="tb-fever-present"
                    />
                    <Obs
                      concept={CONCEPTS.SymptomAbsent}
                      conceptAnswers={FORM_ANSWERS.feverAbsent}
                      path="tb-fever-absent"
                    />
                  </Row>
                </Col>
              </Col>
            </Row>
            <Row style={padding}>
              <Col xs={7}>
                <div>
                  <ControlLabel xs={1}>
                    Night sweats
                  </ControlLabel>
                </div>
                <Col xs={8}>
                  <Row style={setFlex}>
                    <Obs
                      concept={CONCEPTS.SymptomPresent}
                      conceptAnswers={FORM_ANSWERS.nightSweatPresent}
                      path="tb-night-sweat-present"
                    />
                    <Obs
                      concept={CONCEPTS.SymptomAbsent}
                      conceptAnswers={FORM_ANSWERS.nightSweatAbsent}
                      path="tb-night-sweat-absent"
                    />
                  </Row>
                </Col>
              </Col>
            </Row>
            <Row style={padding}>
              <Col xs={7}>
                <div>
                  <ControlLabel xs={1}>
                    Weight Loss
                  </ControlLabel>
                </div>
                <Col xs={8}>
                  <Row style={setFlex}>
                    <Obs
                      concept={CONCEPTS.SymptomPresent}
                      conceptAnswers={FORM_ANSWERS.weightLossPresent}
                      path="tb-weight-loss-present"
                    />
                    <Obs
                      concept={CONCEPTS.SymptomAbsent}
                      conceptAnswers={FORM_ANSWERS.weightlossAbsent}
                      path="tb-weight-loss-absent"
                    />
                  </Row>
                </Col>
              </Col>
            </Row>
            <Row style={padding}>
              <Col xs={7}>
                <div>
                  <ControlLabel xs={1}>
                    Recent contact with active TB (&lt;1 year)
                  </ControlLabel>
                </div>
                <Col xs={8}>
                  <Row style={setFlex}>
                    <Obs
                      concept={CONCEPTS.SymptomPresent}
                      conceptAnswers={FORM_ANSWERS.recentContactWithActiveTBPresent}
                      path="tb-recent-contact-with-active-TB-present"
                    />
                    <Obs
                      concept={CONCEPTS.SymptomAbsent}
                      conceptAnswers={FORM_ANSWERS.recentContactWithActiveTBAbsent}
                      path="tb-recent-contact-with-active-TB-absent"
                    />
                  </Row>
                </Col>
              </Col>
            </Row>
            <Row style={padding}>
              <Col xs={7}>
                <div>
                  <ControlLabel xs={1}>
                    Painful neck and armpit lymph nodes
                  </ControlLabel>
                </div>
                <Col xs={8}>
                  <Row style={setFlex}>
                    <Obs
                      concept={CONCEPTS.SymptomPresent}
                      conceptAnswers={FORM_ANSWERS.painfulNeckAndArmpitLymphTBPresent}
                      path="tb-painful-neck-and-armpit-lymph-node-present"
                    />
                    <Obs
                      concept={CONCEPTS.SymptomAbsent}
                      conceptAnswers={FORM_ANSWERS.painfulNeckAndArmpitLymphTBAbsent}
                      path="tb-painful-neck-and-armpit-lymph-node-absent"
                    />
                  </Row>
                </Col>
              </Col>
            </Row>
          </FormGroup>
      </Grid>
    );

    return (
      <ScreeningForm
        // TODO Implement Queue for TB then update the link
        backLink="/screening/tb/queue"
        encounterType={ENCOUNTER_TYPES.TBScreeningEncounterType}
        formContent={formContent}
        formId="tb-form"
        formInstanceId={this.props.formInstanceId}
        toastMessage="Tb Saved"
      />
    );
  }

}


export default connect((state, props) => {
  const selector = formValueSelector(props.formInstanceId);

  const coughPresent = selector(state, formUtil.obsFieldName('tb-cough-present', CONCEPTS.SymptomPresent.uuid));
  const coughAbsent = selector(state, formUtil.obsFieldName('tb-cough-absent', CONCEPTS.SymptomAbsent.uuid));
  const feverPresent = selector(state, formUtil.obsFieldName('tb-fever-present', CONCEPTS.SymptomPresent.uuid));
  const feverAbsent = selector(state, formUtil.obsFieldName('tb-fever-absent', CONCEPTS.SymptomAbsent.uuid));
  const nightSweatPresent = selector(state, formUtil.obsFieldName('tb-night-sweat-present', CONCEPTS.SymptomPresent.uuid));
  const nightSweatAbsent = selector(state, formUtil.obsFieldName('tb-night-sweat-absent', CONCEPTS.SymptomAbsent.uuid));
  const weightLossPresent = selector(state, formUtil.obsFieldName('tb-weight-loss-present', CONCEPTS.SymptomPresent.uuid));
  const weightLossAbsent = selector(state, formUtil.obsFieldName('tb-weight-loss-absent', CONCEPTS.SymptomAbsent.uuid));
  const recentContactWithActiveTBPresent = selector(state, formUtil.obsFieldName('tb-recent-contact-with-active-TB-present', CONCEPTS.SymptomPresent.uuid));
  const recentContactWithActiveTBAbsent = selector(state, formUtil.obsFieldName('tb-recent-contact-with-active-TB-absent', CONCEPTS.SymptomAbsent.uuid));
  const painfulNeckAndArmpitLymphTBPresent = selector(state, formUtil.obsFieldName('tb-painful-neck-and-armpit-lymph-node-present', CONCEPTS.SymptomPresent.uuid));
  const painfulNeckAndArmpitLymphTBAbsent = selector(state, formUtil.obsFieldName('tb-painful-neck-and-armpit-lymph-node-absent', CONCEPTS.SymptomAbsent.uuid));

  return {
    coughPresent,
    coughAbsent,
    feverPresent,
    feverAbsent,
    nightSweatPresent,
    nightSweatAbsent,
    weightLossPresent,
    weightLossAbsent,
    recentContactWithActiveTBPresent,
    recentContactWithActiveTBAbsent,
    painfulNeckAndArmpitLymphTBPresent,
    painfulNeckAndArmpitLymphTBAbsent
  };
})(TbForm);
