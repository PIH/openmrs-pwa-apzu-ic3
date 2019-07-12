import React from 'react';
import { connect } from 'react-redux';
import { Obs, ObsGroup, formUtil, selectors } from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS} from "../../constants";
import '../../assets/css/tabs.css';
import ScreeningForm from "../ScreeningForm";
import {change, formValueSelector, untouch} from "redux-form";
import { noPaddingLeftAndRight, flexBaseline } from "../../pwaStyles";


class BloodSugarTestForm extends React.PureComponent {

  componentDidUpdate(prevProps) {
    const {
      fsTestType,
      fastingGlucose,
      randomGlucose

    } = this.props;

    if (typeof fsTestType.value !== 'undefined' && fsTestType.value !== prevProps.fsTestType.value) {
      if (fsTestType.value !== CONCEPTS.FASTING_BLOOD_SUGAR_TEST.uuid) {
        this.clearField(fastingGlucose.fieldName);
        console.log("FASTING_BLOOD_SUGAR_TEST was clicked away");
      } else if (fsTestType.value !== CONCEPTS.RANDOM_BLOOD_SUGAR_TEST.uuid) {
        this.clearField(randomGlucose.fieldName);
        console.log("RANDOM_BLOOD_SUGAR_TEST was clicked away");
      }
    }
  }

  clearField(field) {
    this.props.dispatch(change(this.props.formInstanceId, field, null));
    this.props.dispatch(untouch(this.props.formInstanceId, field));
  }

  render() {

    const {
      fsTestType
    } = this.props;

    const formContent = (
      <Grid>
        <ObsGroup
          groupingConcept={CONCEPTS.BLOOD_SUGAR_TEST_SET}
          path="blood-sugar-test-set"
        >
          <Row>
            <Col componentClass={ControlLabel}>
              Blood Sugar Test
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <FormGroup controlId="formBloodSugarTestType">
                <Obs
                  concept={CONCEPTS.FS_BLOOD_SUGAR_TEST_TYPE.uuid}
                  conceptAnswers={FORM_ANSWERS.fsBloodSugarTestTypeAnswers}
                  path="fs-test-type"
                />
              </FormGroup>
            </Col>
          </Row>

          <span
            style={{display: (typeof fsTestType.value !== 'undefined') && (fsTestType.value === CONCEPTS.FASTING_BLOOD_SUGAR_TEST.uuid) ? 'block' : 'none'}}
          >
            <Row>
              <Col sm={12}>
                <div>
                  <ControlLabel sm={6}>
                    Fasting Blood Glucose
                  </ControlLabel>
                </div>
                <FormGroup controlId="formFastingGlucose" style={flexBaseline}>
                  <Col sm={2}>
                    <Obs
                      concept={CONCEPTS.FASTING_BLOOD_GLUCOSE}
                      placeholder="value"
                      path="fasting-glucose"
                    />
                  </Col>
                  <ControlLabel sm={1} style={noPaddingLeftAndRight}>
                    mg/dL
                  </ControlLabel>
                </FormGroup>
              </Col>
            </Row>
          </span>

          <span
            style={{display: (typeof fsTestType.value !== 'undefined') && (fsTestType.value === CONCEPTS.RANDOM_BLOOD_SUGAR_TEST.uuid) ? 'block' : 'none'}}
          >
            <Row>
              <Col sm={12}>
                <div>
                  <ControlLabel sm={6}>
                    Random Blood Glucose
                  </ControlLabel>
                </div>
                <FormGroup controlId="formRandomGlucose" style={flexBaseline}>
                  <Col sm={2}>
                    <Obs
                      concept={CONCEPTS.RANDOM_BLOOD_GLUCOSE}
                      placeholder="value"
                      path="random-glucose"
                    />
                  </Col>
                  <ControlLabel sm={1} style={noPaddingLeftAndRight}>
                    mg/dL
                  </ControlLabel>
                </FormGroup>
              </Col>
            </Row>
          </span>

        </ObsGroup>
      </Grid>
    );

    return (
      <ScreeningForm
        backLink={ this.props.backLink }
        encounterType={ENCOUNTER_TYPES.BloodSugarScreeningEncounterType}
        formContent={formContent}
        formId="blood-sugar-test-form"
        formInstanceId={ this.props.formInstanceId }
        toastMessage="Blood Sugar Test Saved"
      />
    );
  }
};

export default connect((state, props) => {
  const selector = formValueSelector(props.formInstanceId);

  const fsTestTypeFieldName = formUtil.obsFieldName(['blood-sugar-test-set', 'fs-test-type'], [CONCEPTS.BLOOD_SUGAR_TEST_SET.uuid, CONCEPTS.FS_BLOOD_SUGAR_TEST_TYPE.uuid]);
  const fastingGlucoseFieldName = formUtil.obsFieldName(['blood-sugar-test-set', 'fasting-glucose'], [CONCEPTS.BLOOD_SUGAR_TEST_SET.uuid, CONCEPTS.FASTING_BLOOD_GLUCOSE.uuid]);
  const randomGlucoseFieldName = formUtil.obsFieldName(['blood-sugar-test-set', 'random-glucose'], [CONCEPTS.BLOOD_SUGAR_TEST_SET.uuid, CONCEPTS.RANDOM_BLOOD_GLUCOSE.uuid]);


  return {
    fsTestType: {
      fieldName: fsTestTypeFieldName,
      value: selector(state, fsTestTypeFieldName)
    },
    fastingGlucose: {
      fieldName: fastingGlucoseFieldName,
      value: selector(state, fastingGlucoseFieldName)
    },
    randomGlucose: {
      fieldName: randomGlucoseFieldName,
      value: selector(state, randomGlucoseFieldName)
    },
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(BloodSugarTestForm);

