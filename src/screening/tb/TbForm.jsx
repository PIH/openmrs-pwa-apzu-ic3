/* eslint-disable */

import React from 'react';
import {Obs} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import ScreeningForm from "../ScreeningForm";
import { centerElements, padding, setFlex } from "../../pwaStyles";

export default class TbForm extends React.Component {
 render() {
    const formContent = (
      <Grid>
        <br />
          <FormGroup>
            <Row style={padding}>
              <Col xs={6}>
                <ControlLabel xs={1} style={centerElements}>
                  Cough
                </ControlLabel>

                <Col xs={8} xsOffset={2}>
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
              <Col xs={6}>
                <ControlLabel xs={1} style={centerElements}>
                  Fever
                </ControlLabel>

                <Col xs={8} xsOffset={2}>
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
              <Col xs={6}>
                <ControlLabel xs={1} style={centerElements}>
                  Night sweats
                </ControlLabel>

                <Col xs={8} xsOffset={2}>
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
              <Col xs={6}>
                <ControlLabel xs={1} style={centerElements}>
                  Weight Loss
                </ControlLabel>

                <Col xs={8} xsOffset={2}>
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
              <Col xs={6}>
                <ControlLabel xs={1} style={centerElements}>
                  Recent contact with active TB(&lt;1 year)
                </ControlLabel>

                <Col xs={8} xsOffset={2}>
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
              <Col xs={6}>
                <ControlLabel xs={1} style={centerElements}>
                  Painful neck and armpit lymph nodes
                </ControlLabel>

                <Col xs={8} xsOffset={2}>
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
        backLink="/screening/nutrition/queue"
        encounterType={ENCOUNTER_TYPES.TBScreeningEncounterType}
        formContent={formContent}
        formId="tb-form"
        formInstanceId="tb-form"
        toastMessage="Tb Saved"
      />
    );
  }

}
