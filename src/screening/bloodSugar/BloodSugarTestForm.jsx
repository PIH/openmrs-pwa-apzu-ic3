import React from 'react';
import { connect } from 'react-redux';
import { Obs, ObsGroup, formUtil, selectors } from '@openmrs/react-components';
import { Grid, Row, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { ENCOUNTER_TYPES, CONCEPTS, FORM_ANSWERS} from "../../constants";
import '../../assets/css/tabs.css';
import ScreeningForm from "../ScreeningForm";
import { formValueSelector } from "redux-form";
import { noPaddingLeftAndRight, flexBaseline } from "../../pwaStyles";


class BloodSugarTestForm extends React.PureComponent {

  render() {

    const {
      fsTestType
    } = this.props;


    let fastingConcept = Object.assign({}, CONCEPTS.RANDOM_BLOOD_GLUCOSE, { hiNormal: 126 });


    const randomObs = (
      <Obs
        concept={ CONCEPTS.RANDOM_BLOOD_GLUCOSE }
        placeholder="value"
        path="random-glucose"
        required
      />
    );

    const fastingObs = (
      <Obs
        concept={ fastingConcept }
        placeholder="value"
        path="fasting-glucose"
        required
      />
    );

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
                <FormGroup controlId="formRandomGlucose" style={flexBaseline}>
                  <Col sm={2}>
                    {(typeof fsTestType.value !== 'undefined') && (fsTestType.value === CONCEPTS.RANDOM_BLOOD_SUGAR_TEST.uuid) ? randomObs : fastingObs }
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
  const randomGlucoseFieldName = formUtil.obsFieldName(['blood-sugar-test-set', 'random-glucose'], [CONCEPTS.BLOOD_SUGAR_TEST_SET.uuid, CONCEPTS.RANDOM_BLOOD_GLUCOSE.uuid]);


  return {
    fsTestType: {
      fieldName: fsTestTypeFieldName,
      value: selector(state, fsTestTypeFieldName)
    },
    randomGlucose: {
      fieldName: randomGlucoseFieldName,
      value: selector(state, randomGlucoseFieldName)
    },
    patient: selectors.getSelectedPatientFromStore(state)
  };
})(BloodSugarTestForm);

