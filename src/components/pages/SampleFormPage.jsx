import React from 'react';
import { Container } from 'bahmni-form-controls';

class SampleFormPage extends React.Component {

  formDetails = {
    "name": "Test Form",
    "id": 2,
    "uuid": "e5c201c8-cfa8-4214-8e16-79129fbc5e6c",
    "defaultLocale": "en",
    "controls": [{
      "translationKey": "LABEL_1",
      "type": "label",
      "value": "Test Label",
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
        "uuid": "5089AAAAAAAAAAAAAAAAAAAAAAAAAAAA",
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
    "translationsUrl": "/openmrs/ws/rest/v1/bahmniie/form/translations"
  }

  render() {
    return (
      <div>
        <Container
          collapse={ false }
          metadata={this.formDetails}
          observations={[]}
          translations={{}}
         />
      </div>
    );
  }
}

export default SampleFormPage;
