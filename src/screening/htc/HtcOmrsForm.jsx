import React from 'react';
import { Submit, Obs } from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import Form from '../../form/Form';
import { ENCOUNTER_TYPES, CONCEPTS } from "../../constants";

let HtcOmrsForm = (props) => {

  const answers = [
    { uuid: CONCEPTS.HTC_RESULTS.Reactive.uuid, name: CONCEPTS.HTC_RESULTS.Reactive.name },
    { uuid: CONCEPTS.HTC_RESULTS.Non_Reactive.uuid, name: CONCEPTS.HTC_RESULTS.Non_Reactive.name },
    { uuid: CONCEPTS.HTC_RESULTS.Not_Done.uuid, name: CONCEPTS.HTC_RESULTS.Not_Done.name },
  ];

  const formContent = (
    <Grid>
      <Row>
        <FormGroup controlId="formHtc">
          <Col componentClass={ControlLabel} sm={2}>
            Results
          </Col>
          <Col sm={4}>
            <Obs
              concept={CONCEPTS.HTC_RESULTS.uuid}
              path="htc"
              conceptAnswers={ answers }
            />
          </Col>
        </FormGroup>
      </Row>

      <Row>
        <Submit />
      </Row>
    </Grid>
  );

  return (
    <Form
      afterSubmitLink="/screening/htc/queue"
      backLink="/screening/htc/queue"
      encounterType={ ENCOUNTER_TYPES.HTCEncounterType }
      formContent={formContent}
      title="HTC"
    />
  );
};

export default HtcOmrsForm;

