import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../../form/Form';
import { ENCOUNTER_TYPES, CONCEPTS } from "../../constants";

let BloodPressureForm = props => {

  const formDetails = {

    "name": "Blood Pressure Form",
    "id": 2,
    "uuid": "b57712e7-f89b-43a4-8a27-3a626e0785ba",
    "defaultLocale": "en",
    "controls": [{
      "translationKey": "LABEL_1",
      "type": "label",
      "value": "Blood Pressure Form",
      "properties": { "location": { "column": 0, "row": 0 } },
      "id": "1"
    }, {
      "type": "obsControl",
      "label": { "translationKey": "SYSTOLIC_2", "id": "2", "units": "", "type": "label", "value": "Systolic Blood Pressure" },
      "properties": {
        "mandatory": false,
        "notes": false,
        "addMore": false,
        "hideLabel": false,
        "controlEvent": false,
        "location": { "column": 0, "row": 1 },
        "abnormal": false
      },
      "id": "2",
      "concept": {
        "name": "SYSTOLIC",
        "uuid": CONCEPTS.SystolicBloodPressure.uuid,
        "datatype": "Numeric",
        "conceptClass": "Misc",
        "conceptHandler": null,
        "answers": [],
        "properties": { "allowDecimal": false }
      },
      "units": "mmHg",
      "hiNormal": null,
      "lowNormal": null,
      "hiAbsolute": 300.0,
      "lowAbsolute": 30.0
    },
    {
      "type": "obsControl",
      "label": { "translationKey": "DIASTOLIC_2", "id": "3", "units": "", "type": "label", "value": "Diastolic Blood Pressure" },
      "properties": {
        "mandatory": false,
        "notes": false,
        "addMore": false,
        "hideLabel": false,
        "controlEvent": false,
        "location": { "column": 0, "row": 2 },
        "abnormal": false
      },
      "id": "3",
      "concept": {
        "name": "DIASTOLIC",
        "uuid": CONCEPTS.DiastolicBloodPressure.uuid,
        "datatype": "Numeric",
        "conceptClass": "Misc",
        "conceptHandler": null,
        "answers": [],
        "properties": { "allowDecimal": false }
      },
      "units": "mmHg",
      "hiNormal": null,
      "lowNormal": null,
      "hiAbsolute": 150.0,
      "lowAbsolute": 20.0
    }],
    "events": {},
    //"translationsUrl": "/openmrs/ws/rest/v1/bahmniie/form/translations"
  };

  return (
    <Form
      afterSubmitLink="/screening/bloodPressure/queue"
      backLink="/screening/bloodPressure/queue"
      dispatch={props.dispatch}
      encounterType={ENCOUNTER_TYPES.BloodPressureEncounterType}
      formDetails={formDetails}
      patient={props.patient}
      visit={props.visit}
    />
  );
};

BloodPressureForm.propTypes = {
  patient: PropTypes.object.isRequired,
  visit: PropTypes.object,
};

// TODO: fix patient.patient
const mapStateToProps = (state) => {
  return {
    patient: state.selectedPatient.patient,
    visit: {
      uuid: state.selectedPatient.patient.visit.uuid
    }
  };
};

export default connect(mapStateToProps)(BloodPressureForm);
