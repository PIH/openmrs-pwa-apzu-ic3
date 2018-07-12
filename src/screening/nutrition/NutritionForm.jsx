import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../../form/Form';
import { ENCOUNTER_TYPES } from "../../constants";

class NutritionForm extends Form {

  formDetails() {
    return {
      "name": "Nutrition Form",
      "id": 2,
      "uuid": "e5c201c8-cfa8-4214-8e16-79129fbc5e6c",
      "defaultLocale": "en",
      "controls": [{
        "translationKey": "LABEL_1",
        "type": "label",
        "value": "Nutrition Form",
        "properties": { "location": { "column": 0, "row": 0 } },
        "id": "1"
      }, {
        "type": "obsControl",
        "label": { "translationKey": "WEIGHT_2", "id": "2", "units": "", "type": "label", "value": "WEIGHT" },
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
          "name": "WEIGHT",
          "uuid": "3ce93b62-26fe-102b-80cb-0017a47871b2",
          "datatype": "Numeric",
          "conceptClass": "Misc",
          "conceptHandler": null,
          "answers": [],
          "properties": { "allowDecimal": false }
        },
        "units": null,
        "hiNormal": null,
        "lowNormal": null,
        "hiAbsolute": null,
        "lowAbsolute": null
      },
      {
        "type": "obsControl",
        "label": { "translationKey": "HEIGHT_2", "id": "3", "units": "", "type": "label", "value": "HEIGHT" },
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
          "name": "HEIGHT",
          "uuid": "3ce93cf2-26fe-102b-80cb-0017a47871b2",
          "datatype": "Numeric",
          "conceptClass": "Misc",
          "conceptHandler": null,
          "answers": [],
          "properties": { "allowDecimal": false }
        },
        "units": null,
        "hiNormal": null,
        "lowNormal": null,
        "hiAbsolute": null,
        "lowAbsolute": null
      }],
      "events": {},
      //"translationsUrl": "/openmrs/ws/rest/v1/bahmniie/form/translations"
    };
  }

  // TODO correct encounter type, hard-coded to a different encounter type now
  encounterType() {
    return ENCOUNTER_TYPES.NutritionEncounterType;
  }

  queueLink() {
    return "/screening/nutrition/queue";
  }

}

NutritionForm.propTypes = {
  patient: PropTypes.object.isRequired,
  visit: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    patient: state.selected.patient,
    visit: {
      uuid: state.selected.patient.activeVisit
    }
  };
};

export default connect(mapStateToProps)(NutritionForm);
