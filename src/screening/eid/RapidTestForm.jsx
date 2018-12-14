import React from 'react';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { Obs } from '@openmrs/react-components';
import { CONCEPTS, FORM_ANSWERS } from "../../constants";

class RapidTestForm extends React.PureComponent {


  render() {
    const formContent = (
      <Grid>
        <Row>
          <Col componentClass={ControlLabel}>
            Results
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <FormGroup controlId="formRapidTest">
              <Obs
                concept={ CONCEPTS.HTC_RESULTS.uuid }
                conceptAnswers={ FORM_ANSWERS.htcAnswers }
                path="rapid-test-results"/>
            </FormGroup>
          </Col>
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
