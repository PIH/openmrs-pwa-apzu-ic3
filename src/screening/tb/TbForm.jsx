/* eslint-disable */

import React from 'react';
import {Obs} from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import ScreeningForm from "../ScreeningForm";
import { centerElements, padding } from "../../pwaStyles";

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
                  <Obs
                    concept={CONCEPTS.TB.Cough.uuid}
                    conceptAnswers={FORM_ANSWERS.trueFalse}
                    path="tb-cough"
                  />
                </Col>
              </Col>
            </Row>
            <Row style={padding}>
              <Col xs={6}>
                <ControlLabel xs={1} style={centerElements}>
                  Fever
                </ControlLabel>

                <Col xs={8} xsOffset={2}>
                  <Obs
                    concept={CONCEPTS.TB.Fever.uuid}
                    conceptAnswers={FORM_ANSWERS.trueFalse}
                    path="tb-fever"
                  />
                </Col>
              </Col>
            </Row>
            <Row style={padding}>
              <Col xs={6}>
                <ControlLabel xs={1} style={centerElements}>
                  Night sweats
                </ControlLabel>

                <Col xs={8} xsOffset={2}>
                  <Obs
                    concept={CONCEPTS.TB.NightSweats.uuid}
                    conceptAnswers={FORM_ANSWERS.trueFalse}
                    path="tb-night-sweats"
                  />
                </Col>
              </Col>
            </Row>
            <Row style={padding}>
              <Col xs={6}>
                <ControlLabel xs={1} style={centerElements}>
                  Weight Loss
                </ControlLabel>

                <Col xs={8} xsOffset={2}>
                  <Obs
                    concept={CONCEPTS.TB.WeightLoss.uuid}
                    conceptAnswers={FORM_ANSWERS.trueFalse}
                    path="tb-weight-loss"
                  />
                </Col>
              </Col>
            </Row>
            <Row style={padding}>
              <Col xs={6}>
                <ControlLabel xs={1} style={centerElements}>
                  Recent contact with active TB(&lt;1 year)
                </ControlLabel>

                <Col xs={8} xsOffset={2}>
                  <Obs
                    concept={CONCEPTS.TB.RecentContactWithActiveTB.uuid}
                    conceptAnswers={FORM_ANSWERS.trueFalse}
                    path="tb-recent-contact-with-tb"
                  />
                </Col>
              </Col>
            </Row>
            <Row style={padding}>
              <Col xs={6}>
                <ControlLabel xs={1} style={centerElements}>
                  Painful neck and armpit lymph nodes
                </ControlLabel>

                <Col xs={8} xsOffset={2}>
                  <Obs
                    concept={CONCEPTS.TB.PainfulNeckAndArmpitLymphNodes.uuid}
                    conceptAnswers={FORM_ANSWERS.trueFalse}
                    path="tb-painful-neck-and-armpit-lymph-node"
                  />
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
        encounterType={ENCOUNTER_TYPES.TBEncounterType}
        formContent={formContent}
        formId="tb-form"
        formInstanceId="tb-form"
        toastMessage="Tb Saved"
      />
    );
  }

}
