import React from 'react';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { Obs } from '@openmrs/react-components';
import { CONCEPTS, FORM_ANSWERS } from "../../constants";

class RapidTestForm extends React.PureComponent {


  render() {
    const formContent = (
      <Grid>
        <Row>
          <FormGroup controlId="formRapidTest">
              <Col componentClass={ControlLabel} sm={2}>
                Results
              </Col>
              <Col sm={8}>
                <Obs
                  concept={ CONCEPTS.HIV_TEST_RESULTS.uuid }
                  conceptAnswers={ FORM_ANSWERS.hivTestResultAnswers }
                  path="rapid-test-results"
                />
              </Col>
            </FormGroup>
        </Row>
      </Grid>
    );

    return (
      <div>
        { formContent }
      </div>
    );
  }

}

export default RapidTestForm;
