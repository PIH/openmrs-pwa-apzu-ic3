/* eslint-disable */

import React from 'react';
import {connect} from 'react-redux';
import {formUtil, Obs, ObsGroup} from '@openmrs/react-components';
import {change, formValueSelector, untouch} from "redux-form";
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import ScreeningForm from "../ScreeningForm";
import { padding, setFlex } from "../../pwaStyles";


class TbForm extends React.Component {

  componentDidUpdate(prevProps) {

    // make sure that we can't have both present and absent checked at the same time
    // ideally, the form entry technology would have some built in support for this
    if (this.props.coughPresent.value !== prevProps.coughPresent.value && this.props.coughPresent.value === CONCEPTS.TB.Cough.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, this.props.coughAbsent.fieldName, null));
      this.props.dispatch(untouch(this.props.formInstanceId, this.props.coughAbsent.fieldName));
    }

    if (this.props.coughAbsent.value !== prevProps.coughAbsent.value && this.props.coughAbsent.value === CONCEPTS.TB.Cough.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, this.props.coughPresent.fieldName, null));
      this.props.dispatch(untouch(this.props.formInstanceId, this.props.coughPresent.fieldName));
    }

    if (this.props.feverPresent.value !== prevProps.feverPresent.value && this.props.feverPresent.value === CONCEPTS.TB.Fever.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, this.props.feverAbsent.fieldName, null));
      this.props.dispatch(untouch(this.props.formInstanceId, this.props.feverAbsent.fieldName));
    }

    if (this.props.feverAbsent.value !== prevProps.feverAbsent.value && this.props.feverAbsent.value === CONCEPTS.TB.Fever.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, this.props.feverPresent.fieldName, null));
      this.props.dispatch(untouch(this.props.formInstanceId, this.props.feverPresent.fieldName));
    }

    if (this.props.nightSweatPresent.value !== prevProps.nightSweatPresent.value && this.props.nightSweatPresent.value === CONCEPTS.TB.NightSweats.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, this.props.nightSweatAbsent.fieldName, null));
      this.props.dispatch(untouch(this.props.formInstanceId, this.props.nightSweatAbsent.fieldName));
    }

    if (this.props.nightSweatAbsent.value !== prevProps.nightSweatAbsent.value && this.props.nightSweatAbsent.value === CONCEPTS.TB.NightSweats.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, this.props.nightSweatPresent.fieldName, null));
      this.props.dispatch(untouch(this.props.formInstanceId, this.props.nightSweatPresent.fieldName));
    }

    if (this.props.weightLossPresent.value !== prevProps.weightLossPresent.value && this.props.weightLossPresent.value === CONCEPTS.TB.WeightLoss.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, this.props.weightLossAbsent.fieldName, null));
      this.props.dispatch(untouch(this.props.formInstanceId, this.props.weightLossAbsent.fieldName));
    }

    if (this.props.weightLossAbsent.value !== prevProps.weightLossAbsent.value && this.props.weightLossAbsent.value === CONCEPTS.TB.WeightLoss.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, this.props.weightLossPresent.fieldName, null));
      this.props.dispatch(untouch(this.props.formInstanceId, this.props.weightLossPresent.fieldName));
    }

    if (this.props.recentContactWithActiveTBPresent.value !== prevProps.recentContactWithActiveTBPresent.value && this.props.recentContactWithActiveTBPresent.value === CONCEPTS.TB.RecentContactWithActiveTB.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, this.props.recentContactWithActiveTBAbsent.fieldName, null));
      this.props.dispatch(untouch(this.props.formInstanceId, this.props.recentContactWithActiveTBAbsent.fieldName));
    }

    if (this.props.recentContactWithActiveTBAbsent.value !== prevProps.recentContactWithActiveTBAbsent.value && this.props.recentContactWithActiveTBAbsent.value === CONCEPTS.TB.RecentContactWithActiveTB.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, this.props.recentContactWithActiveTBPresent.fieldName, null));
      this.props.dispatch(untouch(this.props.formInstanceId, this.props.recentContactWithActiveTBPresent.fieldName));
    }

    if (this.props.painfulNeckAndArmpitLymphTBPresent.value !== prevProps.painfulNeckAndArmpitLymphTBPresent.value && this.props.painfulNeckAndArmpitLymphTBPresent.value === CONCEPTS.TB.PainfulNeckAndArmpitLymphNodes.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, this.props.painfulNeckAndArmpitLymphTBAbsent.fieldName, null));
      this.props.dispatch(untouch(this.props.formInstanceId, this.props.painfulNeckAndArmpitLymphTBAbsent.fieldName));
    }

    if (this.props.painfulNeckAndArmpitLymphTBAbsent.value !== prevProps.painfulNeckAndArmpitLymphTBAbsent.value && this.props.painfulNeckAndArmpitLymphTBAbsent.value === CONCEPTS.TB.PainfulNeckAndArmpitLymphNodes.uuid) {
      this.props.dispatch(change(this.props.formInstanceId, this.props.painfulNeckAndArmpitLymphTBPresent.fieldName, null));
      this.props.dispatch(untouch(this.props.formInstanceId, this.props.painfulNeckAndArmpitLymphTBPresent.fieldName));
    }

  }


 render() {
    const formContent = (
      <Grid>
        <ObsGroup
          groupingConcept={CONCEPTS.TB.TuberculosisScreeningSet}
          path="tb-screening-set"
        >
          <br/>
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
                      concept={CONCEPTS.TB.SymptomPresent}
                      conceptAnswers={FORM_ANSWERS.coughPresent}
                      path="tb-cough-present"
                    />
                    <Obs
                      concept={CONCEPTS.TB.SymptomAbsent}
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
                      concept={CONCEPTS.TB.SymptomPresent}
                      conceptAnswers={FORM_ANSWERS.feverPresent}
                      path="tb-fever-present"
                    />
                    <Obs
                      concept={CONCEPTS.TB.SymptomAbsent}
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
                      concept={CONCEPTS.TB.SymptomPresent}
                      conceptAnswers={FORM_ANSWERS.nightSweatPresent}
                      path="tb-night-sweat-present"
                    />
                    <Obs
                      concept={CONCEPTS.TB.SymptomAbsent}
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
                      concept={CONCEPTS.TB.SymptomPresent}
                      conceptAnswers={FORM_ANSWERS.weightLossPresent}
                      path="tb-weight-loss-present"
                    />
                    <Obs
                      concept={CONCEPTS.TB.SymptomAbsent}
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
                      concept={CONCEPTS.TB.SymptomPresent}
                      conceptAnswers={FORM_ANSWERS.recentContactWithActiveTBPresent}
                      path="tb-recent-contact-with-active-TB-present"
                    />
                    <Obs
                      concept={CONCEPTS.TB.SymptomAbsent}
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
                      concept={CONCEPTS.TB.SymptomPresent}
                      conceptAnswers={FORM_ANSWERS.painfulNeckAndArmpitLymphTBPresent}
                      path="tb-painful-neck-and-armpit-lymph-node-present"
                    />
                    <Obs
                      concept={CONCEPTS.TB.SymptomAbsent}
                      conceptAnswers={FORM_ANSWERS.painfulNeckAndArmpitLymphTBAbsent}
                      path="tb-painful-neck-and-armpit-lymph-node-absent"
                    />
                  </Row>
                </Col>
              </Col>
            </Row>
          </FormGroup>
        </ObsGroup>
      </Grid>
    );

    return (
      <ScreeningForm
        backLink={this.props.backLink}
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

  const coughPresentField = formUtil.obsFieldName(['tb-screening-set', 'tb-cough-present'],
    [CONCEPTS.TB.TuberculosisScreeningSet, CONCEPTS.TB.SymptomPresent]);
  const coughAbsentField = formUtil.obsFieldName(['tb-screening-set', 'tb-cough-absent'],
    [CONCEPTS.TB.TuberculosisScreeningSet, CONCEPTS.TB.SymptomAbsent]);
  const feverPresentField = formUtil.obsFieldName(['tb-screening-set', 'tb-fever-present'],
    [CONCEPTS.TB.TuberculosisScreeningSet, CONCEPTS.TB.SymptomPresent]);
  const feverAbsentField = formUtil.obsFieldName(['tb-screening-set', 'tb-fever-absent'],
    [CONCEPTS.TB.TuberculosisScreeningSet, CONCEPTS.TB.SymptomAbsent]);
  const nightSweatPresentField = formUtil.obsFieldName(['tb-screening-set', 'tb-night-sweat-present'],
    [CONCEPTS.TB.TuberculosisScreeningSet, CONCEPTS.TB.SymptomPresent]);
  const nightSweatAbsentField = formUtil.obsFieldName(['tb-screening-set', 'tb-night-sweat-absent'],
    [CONCEPTS.TB.TuberculosisScreeningSet, CONCEPTS.TB.SymptomAbsent]);
  const weightLossPresentField = formUtil.obsFieldName(['tb-screening-set', 'tb-weight-loss-present'],
    [CONCEPTS.TB.TuberculosisScreeningSet, CONCEPTS.TB.SymptomPresent]);
  const weightLossAbsentField = formUtil.obsFieldName(['tb-screening-set', 'tb-weight-loss-absent'],
    [CONCEPTS.TB.TuberculosisScreeningSet, CONCEPTS.TB.SymptomAbsent]);
  const recentContactWithActiveTBPresentField = formUtil.obsFieldName(['tb-screening-set', 'tb-recent-contact-with-active-TB-present'],
    [CONCEPTS.TB.TuberculosisScreeningSet, CONCEPTS.TB.SymptomPresent]);
  const recentContactWithActiveTBAbsentField = formUtil.obsFieldName(['tb-screening-set', 'tb-recent-contact-with-active-TB-absent'],
    [CONCEPTS.TB.TuberculosisScreeningSet, CONCEPTS.TB.SymptomAbsent]);
  const painfulNeckAndArmpitLymphTBPresentField = formUtil.obsFieldName(['tb-screening-set', 'tb-painful-neck-and-armpit-lymph-node-present'],
    [CONCEPTS.TB.TuberculosisScreeningSet, CONCEPTS.TB.SymptomPresent]);
  const painfulNeckAndArmpitLymphTBAbsentField = formUtil.obsFieldName(['tb-screening-set', 'tb-painful-neck-and-armpit-lymph-node-absent'],
    [CONCEPTS.TB.TuberculosisScreeningSet, CONCEPTS.TB.SymptomAbsent]);

  return {
    coughPresent: {
      fieldName: coughPresentField,
      value: selector(state, coughPresentField)
    },
    coughAbsent: {
      fieldName: coughAbsentField,
      value: selector(state, coughAbsentField)
    },
    feverPresent: {
      fieldName: feverPresentField,
      value: selector(state, feverPresentField)
    },
    feverAbsent: {
      fieldName: feverAbsentField,
      value: selector(state, feverAbsentField)
    },
    nightSweatPresent: {
      fieldName: nightSweatPresentField,
      value: selector(state, nightSweatPresentField)
    },
    nightSweatAbsent: {
      fieldName: nightSweatAbsentField,
      value: selector(state, nightSweatAbsentField)
    },
    weightLossPresent: {
      fieldName: weightLossPresentField,
      value: selector(state, weightLossPresentField)
    },
    weightLossAbsent: {
      fieldName: weightLossAbsentField,
      value: selector(state, weightLossAbsentField)
    },
    recentContactWithActiveTBPresent: {
      fieldName: recentContactWithActiveTBPresentField,
      value: selector(state, recentContactWithActiveTBPresentField)
    },
    recentContactWithActiveTBAbsent: {
      fieldName: recentContactWithActiveTBAbsentField,
      value: selector(state, recentContactWithActiveTBAbsentField)
    },
    painfulNeckAndArmpitLymphTBPresent: {
      fieldName: painfulNeckAndArmpitLymphTBPresentField,
      value: selector(state, painfulNeckAndArmpitLymphTBPresentField)
    },
    painfulNeckAndArmpitLymphTBAbsent: {
      fieldName: painfulNeckAndArmpitLymphTBAbsentField,
      value: selector(state, painfulNeckAndArmpitLymphTBAbsentField)
    }
  };
})(TbForm);
