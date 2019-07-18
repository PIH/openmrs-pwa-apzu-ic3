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
    if (typeof this.props.fsTestType.value !== 'undefined' &&
      typeof prevProps.fsTestType.value !== 'undefined' &&
      this.props.fsTestType.value !== prevProps.fsTestType.value) {
      this.clearField(this.props.bloodGlucose.fieldName);
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

    let glucoseConcept = Object.assign({}, CONCEPTS.BLOOD_GLUCOSE);

    if ((typeof fsTestType.value !== 'undefined') && (fsTestType.value === CONCEPTS.FASTING_BLOOD_SUGAR_TEST.uuid)) {
      glucoseConcept.hiNormal = 126;
    }

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
                  concept={CONCEPTS.FS_BLOOD_SUGAR_TEST_TYPE}
                  conceptAnswers={FORM_ANSWERS.fsBloodSugarTestTypeAnswers}
                  path="fs-test-type"
                  required
                />
              </FormGroup>
            </Col>
          </Row>

          <span
            style={{display: (typeof fsTestType.value !== 'undefined') ? 'block' : 'none'}}
          >
            <Row>
              <Col sm={12}>
                <div>
                  <ControlLabel sm={6}>
                    Blood Glucose
                  </ControlLabel>
                </div>
                <FormGroup controlId="formGlucose" style={flexBaseline}>
                  <Col sm={2}>
                    <Obs
                      concept={glucoseConcept}
                      placeholder="value"
                      path="glucose"
                      required
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

  const bloodGlucoseFieldName = formUtil.obsFieldName(['blood-sugar-test-set', 'glucose'], [CONCEPTS.BLOOD_SUGAR_TEST_SET.uuid, CONCEPTS.BLOOD_GLUCOSE.uuid]);


  return {
    fsTestType: {
      fieldName: fsTestTypeFieldName,
      value: selector(state, fsTestTypeFieldName)
    },
    bloodGlucose: {
      fieldName: bloodGlucoseFieldName,
      value: selector(state, bloodGlucoseFieldName)
    },
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(BloodSugarTestForm);

