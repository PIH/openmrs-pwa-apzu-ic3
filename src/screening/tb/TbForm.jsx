/* eslint-disable */

import React from 'react';
import {Obs} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import ScreeningForm from "../ScreeningForm";
import { padding, setFlex } from "../../pwaStyles";

export default class TbForm extends React.Component {
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
