import tbTestResultFilters from '../tbTestResultFilters';
import { ENCOUNTER_TYPES } from "../../../constants";

describe('tbTestResultFilters', () => {

  it('completed: should filter out patients with TB test results encounter and obs', () => {

    const results = [
      {
        uuid: 'abcd',
        age: 20,
        visit: {
          encounters: [
            {
              encounterType: {
                uuid: ENCOUNTER_TYPES.CheckInEncounterType.uuid,
                name: "Check-in"
              },
              obs: [
                {
                  "uuid": "fa7b25cb-aa9b-46f1-af02-d9d489e356dd",
                  "id": 3811958,
                  "value": {
                    "uuid": "656cce7e-977f-11e1-8993-905e29aff6c1",
                    "display": "Other non-coded",
                    "name": {
                      "display": "Other non-coded",
                      "uuid": "660415e0-977f-11e1-8993-905e29aff6c1",
                      "name": "Other non-coded",
                      "locale": "en",
                      "localePreferred": false,
                      "conceptNameType": "FULLY_SPECIFIED"
                    },
                    "set": false,
                    "version": "",
                    "retired": false,
                    "answers": [],
                    "setMembers": []
                  },
                  "concept": {
                    "uuid": "65664fc2-977f-11e1-8993-905e29aff6c1"
                  },
                  "comment": "checkin-form^referral",
                  "display": "Type of referring clinic or hospital: Other non-coded",
                  "encounter": {
                    "uuid": "1215b1c5-c46a-4424-ae73-13488d009559"
                  },
                  "obsGroup": null,
                  "groupMembers": null
                }
              ]
            },
            {
              "id": 760554,
              "uuid": "49bfd990-8743-45af-a153-6adc0210cb7f",
              "encounterDatetime": "2019-02-14T08:24:25.000-0500",
              "location": {
                "id": 4,
                "uuid": "0d41505c-5ab4-11e0-870c-9f6107fee88e",
                "name": "Neno Mission HC"
              },
              "encounterType": {
                "id": 155,
                "uuid": "C770232A-4847-42D9-8F70-B01B5BA0EED8",
                "name": "TB Test Results"
              },
              "obs": [
                {
                  "uuid": "e73fbb25-eba2-4143-b85e-814913aad2c9",
                  "id": 3811962,
                  "value": null,
                  "concept": {
                    "uuid": "4c92373c-28d6-11e9-b210-d663bd873d93"
                  },
                  "comment": "tb-test-type-form^tb-test-screening-set",
                  "display": "Tuberculosis test set: Satisfactory, Tuberculosis smear microscopy method, Yes, Tuberculosis smear result, Negative",
                  "encounter": {
                    "uuid": "49bfd990-8743-45af-a153-6adc0210cb7f"
                  },
                  "obsGroup": null,
                  "groupMembers": [
                    {
                      "uuid": "ec6d5d21-2d54-4f45-80d2-6ca6f93e1412",
                      "id": 3811963,
                      "value": {
                        "uuid": "6559dde6-977f-11e1-8993-905e29aff6c1",
                        "display": "Satisfactory",
                        "name": {
                          "display": "Satisfactory",
                          "uuid": "65f7045e-977f-11e1-8993-905e29aff6c1",
                          "name": "Satisfactory",
                          "locale": "en",
                          "localePreferred": false,
                          "conceptNameType": "FULLY_SPECIFIED"
                        },
                        "set": false,
                        "version": "",
                        "retired": false,
                        "names": [
                          {
                            "uuid": "65f7045e-977f-11e1-8993-905e29aff6c1",
                            "display": "Satisfactory"
                          }
                        ],
                        "answers": [],
                        "setMembers": []
                      },
                      "concept": {
                        "uuid": "165253AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
                      },
                      "comment": "tb-test-type-form^tb-test-screening-set^tb-sputum-sample-quality",
                      "display": "Sample quality: Satisfactory",
                      "encounter": {
                        "uuid": "49bfd990-8743-45af-a153-6adc0210cb7f"
                      },
                      "obsGroup": {
                        "uuid": "e73fbb25-eba2-4143-b85e-814913aad2c9"
                      },
                      "groupMembers": null
                    },
                    {
                      "uuid": "89719ff2-b07c-40a1-91d6-dcf46b1ca398",
                      "id": 3811964,
                      "value": {
                        "uuid": "65628356-977f-11e1-8993-905e29aff6c1",
                        "display": "Tuberculosis smear microscopy method",
                        "name": {
                          "display": "Tuberculosis smear microscopy method",
                          "uuid": "65ff099c-977f-11e1-8993-905e29aff6c1",
                          "name": "Tuberculosis smear microscopy method",
                          "locale": "en",
                          "localePreferred": true,
                          "conceptNameType": "FULLY_SPECIFIED"
                        },
                        "set": false,
                        "version": null,
                        "retired": false,
                        "names": [
                          {
                            "uuid": "65ff099c-977f-11e1-8993-905e29aff6c1",
                            "display": "Tuberculosis smear microscopy method"
                          },
                          {
                            "uuid": "660e588e-977f-11e1-8993-905e29aff6c1",
                            "display": "Method"
                          }
                        ],
                        "setMembers": []
                      },
                      "concept": {
                        "uuid": "6fc0ab50-9492-11e7-abc4-cec278b6b50a"
                      },
                      "comment": "tb-test-type-form^tb-test-screening-set^tb-sputum-laboratory-location",
                      "display": "Location of laboratory: Tuberculosis smear microscopy method",
                      "encounter": {
                        "uuid": "49bfd990-8743-45af-a153-6adc0210cb7f"
                      },
                      "obsGroup": {
                        "uuid": "e73fbb25-eba2-4143-b85e-814913aad2c9"
                      },
                      "groupMembers": null
                    },
                    {
                      "uuid": "88de7684-8c0a-4ee8-bf7a-ce3f6f1006f5",
                      "id": 3811965,
                      "value": {
                        "uuid": "65576354-977f-11e1-8993-905e29aff6c1",
                        "display": "Yes",
                        "name": {
                          "display": "Yes",
                          "uuid": "65f50fd2-977f-11e1-8993-905e29aff6c1",
                          "name": "Yes",
                          "locale": "en",
                          "localePreferred": false,
                          "conceptNameType": "FULLY_SPECIFIED"
                        },
                        "set": false,
                        "version": "",
                        "retired": false,
                        "names": [
                          {
                            "uuid": "65f50fd2-977f-11e1-8993-905e29aff6c1",
                            "display": "Yes"
                          }
                        ],
                        "answers": [],
                        "setMembers": []
                      },
                      "concept": {
                        "uuid": "165252AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
                      },
                      "comment": "tb-test-type-form^tb-test-screening-set^tb-sputum-received",
                      "display": "Sample collected: Yes",
                      "encounter": {
                        "uuid": "49bfd990-8743-45af-a153-6adc0210cb7f"
                      },
                      "obsGroup": {
                        "uuid": "e73fbb25-eba2-4143-b85e-814913aad2c9"
                      },
                      "groupMembers": null
                    },
                    {
                      "uuid": "7b015cf5-760a-438d-8324-2dbd5b9ad144",
                      "id": 3811966,
                      "value": {
                        "uuid": "65628568-977f-11e1-8993-905e29aff6c1",
                        "display": "Tuberculosis smear result",
                        "name": {
                          "display": "Tuberculosis smear result",
                          "uuid": "65ff0f6e-977f-11e1-8993-905e29aff6c1",
                          "name": "Tuberculosis smear result",
                          "locale": "en",
                          "localePreferred": true,
                          "conceptNameType": "FULLY_SPECIFIED"
                        },
                        "datatype": {
                          "uuid": "8d4a48b6-c2cc-11de-8d13-0010c6dffd0f",
                          "display": "Coded"
                        },
                        "conceptClass": {
                          "uuid": "8d491e50-c2cc-11de-8d13-0010c6dffd0f",
                          "display": "Question"
                        },
                        "set": false,
                        "version": null,
                        "retired": false,
                        "setMembers": []
                      },
                      "concept": {
                        "uuid": "38c4512a-5aef-487d-a450-ecea4bc5df7e"
                      },
                      "comment": "tb-test-type-form^tb-test-screening-set^tb-test-type",
                      "display": "Tuberculosis test type: Tuberculosis smear result",
                      "encounter": {
                        "uuid": "49bfd990-8743-45af-a153-6adc0210cb7f"
                      },
                      "obsGroup": {
                        "uuid": "e73fbb25-eba2-4143-b85e-814913aad2c9"
                      },
                      "groupMembers": null
                    },
                    {
                      "uuid": "71b3ef21-ba56-451f-9ac8-9228e25c5474",
                      "id": 3811967,
                      "value": {
                        "uuid": "654994c2-977f-11e1-8993-905e29aff6c1",
                        "display": "Negative",
                        "name": {
                          "display": "Negative",
                          "uuid": "65f3366c-977f-11e1-8993-905e29aff6c1",
                          "name": "Negative",
                          "locale": "en",
                          "localePreferred": false,
                          "conceptNameType": "FULLY_SPECIFIED"
                        },
                        "datatype": {
                          "uuid": "8d4a4c94-c2cc-11de-8d13-0010c6dffd0f",
                          "display": "N/A"
                        },
                        "conceptClass": {
                          "uuid": "8d492774-c2cc-11de-8d13-0010c6dffd0f",
                          "display": "Misc"
                        },
                        "set": false,
                        "version": "",
                        "retired": false,
                        "answers": [],
                        "setMembers": []
                      },
                      "concept": {
                        "uuid": "65628568-977f-11e1-8993-905e29aff6c1"
                      },
                      "comment": "tb-test-type-form^tb-test-screening-set^tb-smear-result",
                      "display": "Tuberculosis smear result: Negative",
                      "encounter": {
                        "uuid": "49bfd990-8743-45af-a153-6adc0210cb7f"
                      },
                      "obsGroup": {
                        "uuid": "e73fbb25-eba2-4143-b85e-814913aad2c9"
                      },
                      "groupMembers": null
                    }
                  ]
                }
              ]
            }
          ]
        },
        alert:[
          {
            "name": "routine-blood-sugar-high-risk",
            "categories": [
              "diabetes"
            ],
            "alert": "Routine Blood Sugar for high risk population",
            "action": "Routine Blood Sugar for high risk population"
          },
          {
            "name": "eligible-for-bp-screening",
            "categories": [
              "bp",
              "screening-eligibility"
            ],
            "alert": "Due for BP Screening",
            "action": "Refer to BP Screening station"
          },
          {
            "name": "eligible-for-blood-glucose-screening-not-enrolled",
            "categories": [
              "blood-glucose",
              "screening-eligibility"
            ],
            "alert": "Enroll if confirmed by clinician meets criteria",
            "action": "Action: Eligible for blood sugar test"
          },
          {
            "name": "eligible-for-weight",
            "categories": [
              "nutrition",
              "screening-eligibility"
            ],
            "alert": "Due for Nutrition Screening",
            "action": "Refer to Nutrition Screening station"
          },
          {
            "name": "eligible-for-tb-screening",
            "categories": [
              "tb",
              "screening-eligibility"
            ],
            "alert": "Eligible for TB screening",
            "action": "Action: Refer to the TB screening station"
          },
          {
            "name": "abnormal-result-tb",
            "categories": [
              "tb",
              "abnormal-result"
            ],
            "alert": "TB symptoms",
            "action": "Action: Refer to nurse station for sputum submission"
          }
        ],
      },
      {
        uuid: '5678',
        age: 10,
        visit: {
          encounters: [
            {
              encounterType: {
                uuid: ENCOUNTER_TYPES.CheckInEncounterType.uuid
              }
            }
          ]
        }
      },
    ].filter(tbTestResultFilters.completed);

    expect(results.length).toBe(1);
    expect(results[0].uuid).toBe("abcd");

  });

});
