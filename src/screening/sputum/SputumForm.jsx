import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector, change, untouch } from 'redux-form';
import { Obs, formUtil, selectors } from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS } from "../../constants";
import ScreeningForm from "../ScreeningForm";

class SputumForm extends React.PureComponent {

  componentDidUpdate(prevProps) {
    // this clears out form values when the "Sputum received" question is changed
    if (typeof this.props.sputumReceived !== 'undefined' && this.props.sputumReceived !== prevProps.sputumReceived) {
      if (this.props.sputumReceived === CONCEPTS.SputumReceivedFalse.uuid) {
        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('sputum-sample-quality', CONCEPTS.SampleQuality.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('sputum-sample-quality', CONCEPTS.SampleQuality.uuid)));

        this.props.dispatch(change(this.props.formInstanceId, formUtil.obsFieldName('sputum-laboratory-location', CONCEPTS.LabLocation.uuid), null));
        this.props.dispatch(untouch(this.props.formInstanceId, formUtil.obsFieldName('sputum-laboratory-location', CONCEPTS.LabLocation.uuid)));
      }
    }
  }

  render() {
    const formContent = (
      <Grid>

        <Row>
          <Col
            componentClass={ControlLabel}
          >
            Sputum received
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <FormGroup controlId="formBled">
              <Obs
                concept={CONCEPTS.SputumReceived.uuid}
                conceptAnswers={FORM_ANSWERS.sputumReceivedYesNo}
                path="sputum-received"
              />
            </FormGroup>
          </Col>
        </Row>

        <span
          style={{ display: (typeof this.props.sputumReceived !== 'undefined') && (this.props.sputumReceived === CONCEPTS.SputumReceivedTrue.uuid) ? 'block' : 'none' }}
        >
          <Row>
            <Col componentClass={ControlLabel}>
              Sample quality
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="formReasonForNoSample">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.SampleQuality.uuid}
                  conceptAnswers={FORM_ANSWERS.sampleQualityAnswers}
                  path="sputum-sample-quality"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>


        <span
          style={{ display: (typeof this.props.sputumSampleQuality !== 'undefined') && (this.props.sputumSampleQuality === CONCEPTS.satisfactorySampleQuality.uuid) ? 'block' : 'none' }}
        >
          <Row>
            <Col componentClass={ControlLabel}>
             Laboratory location
            </Col>
          </Row>
          <Row>
            <FormGroup controlId="formReasonForTesting">
              <Col sm={12}>
                <Obs
                  concept={CONCEPTS.LabLocation.uuid}
                  conceptAnswers={FORM_ANSWERS.SputumLabLocation}
                  path="sputum-laboratory-location"
                />
              </Col>
            </FormGroup>
          </Row>
        </span>
      </Grid>
    );

    return (
      <ScreeningForm
        backLink="/screening"
        encounterType={ENCOUNTER_TYPES.SputumEncounterType}
        formContent={formContent}
        formId="sputum-form"
        formInstanceId={this.props.formInstanceId}
        toastMessage="Sputum Saved"
      />
    );

  }
}


export default connect((state, props) => {
  const selector = formValueSelector(props.formInstanceId);
  const sputumReceived = selector(state, formUtil.obsFieldName('sputum-received', CONCEPTS.SputumReceived.uuid));
  const sputumSampleQuality = selector(state, formUtil.obsFieldName('sputum-sample-quality', CONCEPTS.SampleQuality.uuid));
  return {
    sputumReceived,
    sputumSampleQuality,
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(SputumForm);
