import createQueueReducer from './createQueueReducer';
import { VISIT_TYPES } from "@openmrs/react-components";

describe('createQueueRender', () => {

  const sampleVisits =[
    {
      "uuid": "af02b757-eb0a-4e64-b872-0091ad1d9b8a",
      "patient": {
        "uuid": "a46864ac-4cee-4e3a-a920-7b5799f1dc9a",
        "display": "Y2A73V - Bob Dylan",
        "identifiers": [
          {
            "uuid": "df3309c3-012f-47ad-b372-15c4f78563ec",
            "display": "ZL EMR ID = Y2A73V",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/a46864ac-4cee-4e3a-a920-7b5799f1dc9a/identifier/df3309c3-012f-47ad-b372-15c4f78563ec"
              }
            ]
          }
        ],
        "person": {
          "uuid": "a46864ac-4cee-4e3a-a920-7b5799f1dc9a",
          "display": "Bob Dylan",
          "gender": "M",
          "age": 22,
          "birthdate": "1996-01-01T00:00:00.000-0500",
          "birthdateEstimated": true,
          "dead": false,
          "deathDate": null,
          "causeOfDeath": null,
          "preferredName": {
            "uuid": "0f985ec6-5698-463e-a5a8-bbd19f3e01e1",
            "display": "Dylan, Bob",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/a46864ac-4cee-4e3a-a920-7b5799f1dc9a/name/0f985ec6-5698-463e-a5a8-bbd19f3e01e1"
              }
            ]
          },
          "preferredAddress": {
            "uuid": "cd5e6826-7820-4ad8-8f30-e7ab5392e876",
            "display": "Cange",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/a46864ac-4cee-4e3a-a920-7b5799f1dc9a/address/cd5e6826-7820-4ad8-8f30-e7ab5392e876"
              }
            ]
          },
          "attributes": [
            {
              "uuid": "31438a6a-a459-4ef6-a388-4a442ee0dfe1",
              "display": "First Name of Mother = test",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/a46864ac-4cee-4e3a-a920-7b5799f1dc9a/attribute/31438a6a-a459-4ef6-a388-4a442ee0dfe1"
                }
              ]
            }
          ],
          "voided": false,
          "deathdateEstimated": false,
          "birthtime": null,
          "links": [
            {
              "rel": "self",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/a46864ac-4cee-4e3a-a920-7b5799f1dc9a"
            },
            {
              "rel": "full",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/a46864ac-4cee-4e3a-a920-7b5799f1dc9a?v=full"
            }
          ],
          "resourceVersion": "1.11"
        },
        "voided": false,
        "links": [
          {
            "rel": "self",
            "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/a46864ac-4cee-4e3a-a920-7b5799f1dc9a"
          },
          {
            "rel": "full",
            "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/a46864ac-4cee-4e3a-a920-7b5799f1dc9a?v=full"
          }
        ],
        "resourceVersion": "1.8"
      },
      "encounters": [
        {
          "uuid": "c8e6b96e-ba0c-4f25-81c1-2d00dcb7cf16",
          "display": "Inscription 15/06/2018",
          "encounterDatetime": "2018-06-15T14:58:36.000-0400",
          "patient": {
            "uuid": "a46864ac-4cee-4e3a-a920-7b5799f1dc9a",
            "display": "Y2A73V - Bob Dylan",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/a46864ac-4cee-4e3a-a920-7b5799f1dc9a"
              }
            ]
          },
          "location": {
            "uuid": "9e212720-eeab-43ef-a6c0-95c3881052bc",
            "display": "CDI Klinik Ekstèn Jeneral Famasi",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/9e212720-eeab-43ef-a6c0-95c3881052bc"
              }
            ]
          },
          "form": {
            "uuid": "8757a568-23d1-4e18-907b-728b56ca7756",
            "display": "Inscription",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/form/8757a568-23d1-4e18-907b-728b56ca7756"
              }
            ]
          },
          "encounterType": {
            "uuid": "55a0d3ea-a4d7-4e88-8f01-5aceb2d3c61b",
            "display": "Inscription",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/encountertype/55a0d3ea-a4d7-4e88-8f01-5aceb2d3c61b"
              }
            ]
          },
          "obs": [
            {
              "uuid": "f9b05663-009f-403f-bd58-990e1a60d180",
              "display": "Informations sur le règlement: 100,0",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/obs/f9b05663-009f-403f-bd58-990e1a60d180"
                }
              ]
            },
            {
              "uuid": "c10fe376-3671-4a64-bc56-f082a0c3dc91",
              "display": "Type de visite: Pharmacie uniquement",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/obs/c10fe376-3671-4a64-bc56-f082a0c3dc91"
                }
              ]
            }
          ],
          "orders": [],
          "voided": false,
          "visit": {
            "uuid": "af02b757-eb0a-4e64-b872-0091ad1d9b8a",
            "display": "Clinic or Hospital Visit @ Hôpital Universitaire de Mirebalais - 15/06/2018 11:35",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/visit/af02b757-eb0a-4e64-b872-0091ad1d9b8a"
              }
            ]
          },
          "encounterProviders": [
            {
              "uuid": "2ca35183-c515-4694-a637-12326c3a89ef",
              "display": "Mark Goodrich: Administrative Clerk",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/c8e6b96e-ba0c-4f25-81c1-2d00dcb7cf16/encounterprovider/2ca35183-c515-4694-a637-12326c3a89ef"
                }
              ]
            }
          ],
          "links": [
            {
              "rel": "self",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/c8e6b96e-ba0c-4f25-81c1-2d00dcb7cf16"
            },
            {
              "rel": "full",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/c8e6b96e-ba0c-4f25-81c1-2d00dcb7cf16?v=full"
            }
          ],
          "resourceVersion": "1.9"
        }
      ]
    },
    {
      "uuid": "44892810-75e5-49fc-b1a1-dc1732f424fb",
      "patient": {
        "uuid": "e3d9220d-8b08-4218-956d-825687719936",
        "display": "Y2DJKC - Neil Young",
        "identifiers": [
          {
            "uuid": "6ca3e9af-4c3c-461d-9cdf-602b8bb24f5f",
            "display": "ZL EMR ID = Y2DJKC",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/e3d9220d-8b08-4218-956d-825687719936/identifier/6ca3e9af-4c3c-461d-9cdf-602b8bb24f5f"
              }
            ]
          }
        ],
        "person": {
          "uuid": "e3d9220d-8b08-4218-956d-825687719936",
          "display": "Neil Young",
          "gender": "M",
          "age": 77,
          "birthdate": "1941-01-01T00:00:00.000-0500",
          "birthdateEstimated": true,
          "dead": false,
          "deathDate": null,
          "causeOfDeath": null,
          "preferredName": {
            "uuid": "5efe10ed-02a0-40b4-89c2-618a7daf3684",
            "display": "Young, Neil",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/e3d9220d-8b08-4218-956d-825687719936/name/5efe10ed-02a0-40b4-89c2-618a7daf3684"
              }
            ]
          },
          "preferredAddress": {
            "uuid": "c8b8813c-6b08-40a6-8c10-87463ac02b7c",
            "display": "Cange",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/e3d9220d-8b08-4218-956d-825687719936/address/c8b8813c-6b08-40a6-8c10-87463ac02b7c"
              }
            ]
          },
          "attributes": [
            {
              "uuid": "e2ed1245-762d-4e0e-b26b-11836aceb27c",
              "display": "First Name of Mother = test",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/e3d9220d-8b08-4218-956d-825687719936/attribute/e2ed1245-762d-4e0e-b26b-11836aceb27c"
                }
              ]
            },
            {
              "uuid": "b547c500-1f36-4137-8cad-a247bd0c0629",
              "display": "Telephone Number = tet",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/e3d9220d-8b08-4218-956d-825687719936/attribute/b547c500-1f36-4137-8cad-a247bd0c0629"
                }
              ]
            }
          ],
          "voided": false,
          "deathdateEstimated": false,
          "birthtime": null,
          "links": [
            {
              "rel": "self",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/e3d9220d-8b08-4218-956d-825687719936"
            },
            {
              "rel": "full",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/e3d9220d-8b08-4218-956d-825687719936?v=full"
            }
          ],
          "resourceVersion": "1.11"
        },
        "voided": false,
        "links": [
          {
            "rel": "self",
            "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/e3d9220d-8b08-4218-956d-825687719936"
          },
          {
            "rel": "full",
            "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/e3d9220d-8b08-4218-956d-825687719936?v=full"
          }
        ],
        "resourceVersion": "1.8"
      },
      "encounters": [
        {
          "uuid": "1efcede6-912e-49ea-8965-1f97f0f95002",
          "display": "Signes vitaux 14/06/2018",
          "encounterDatetime": "2018-06-14T17:22:48.000-0400",
          "patient": {
            "uuid": "e3d9220d-8b08-4218-956d-825687719936",
            "display": "Y2DJKC - Neil Young",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/e3d9220d-8b08-4218-956d-825687719936"
              }
            ]
          },
          "location": null,
          "form": null,
          "encounterType": {
            "uuid": "4fb47712-34a6-40d2-8ed3-e153abbd25b7",
            "display": "Signes vitaux",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/encountertype/4fb47712-34a6-40d2-8ed3-e153abbd25b7"
              }
            ]
          },
          "obs": [
            {
              "uuid": "3929cb33-1460-4d78-a88a-b8e94b3fcb1b",
              "display": "Pression systolique: 120,0",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/obs/3929cb33-1460-4d78-a88a-b8e94b3fcb1b"
                }
              ]
            },
            {
              "uuid": "22939be6-4310-4d5d-b053-98d1cc71fc64",
              "display": "Pression diastolique: 140,0",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/obs/22939be6-4310-4d5d-b053-98d1cc71fc64"
                }
              ]
            }
          ],
          "orders": [],
          "voided": false,
          "visit": {
            "uuid": "44892810-75e5-49fc-b1a1-dc1732f424fb",
            "display": "Clinic or Hospital Visit @ Hôpital Universitaire de Mirebalais - 12/03/2018 15:06",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/visit/44892810-75e5-49fc-b1a1-dc1732f424fb"
              }
            ]
          },
          "encounterProviders": [],
          "links": [
            {
              "rel": "self",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/1efcede6-912e-49ea-8965-1f97f0f95002"
            },
            {
              "rel": "full",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/1efcede6-912e-49ea-8965-1f97f0f95002?v=full"
            }
          ],
          "resourceVersion": "1.9"
        },
        {
          "uuid": "f767d819-52d2-4e78-9845-a9fa399cfa75",
          "display": "Admission aux soins hospitaliers 12/03/2018",
          "encounterDatetime": "2018-03-12T15:24:14.000-0400",
          "patient": {
            "uuid": "e3d9220d-8b08-4218-956d-825687719936",
            "display": "Y2DJKC - Neil Young",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/e3d9220d-8b08-4218-956d-825687719936"
              }
            ]
          },
          "location": {
            "uuid": "950852f3-8a96-4d82-a5f8-a68a92043164",
            "display": "Sal Aprè Akouchman",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/950852f3-8a96-4d82-a5f8-a68a92043164"
              }
            ]
          },
          "form": {
            "uuid": "43acf930-eb1b-11e2-91e2-0800200c9a66",
            "display": "Admission",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/form/43acf930-eb1b-11e2-91e2-0800200c9a66"
              }
            ]
          },
          "encounterType": {
            "uuid": "260566e1-c909-4d61-a96f-c1019291a09d",
            "display": "Admission aux soins hospitaliers",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/encountertype/260566e1-c909-4d61-a96f-c1019291a09d"
              }
            ]
          },
          "obs": [
            {
              "uuid": "009939c3-1733-42ee-b76c-e5647ba9ff00",
              "display": "Visit Diagnoses: Présumé, Primaire, Hémorragie gastro-intestinale",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/obs/009939c3-1733-42ee-b76c-e5647ba9ff00"
                }
              ]
            }
          ],
          "orders": [],
          "voided": false,
          "visit": {
            "uuid": "44892810-75e5-49fc-b1a1-dc1732f424fb",
            "display": "Clinic or Hospital Visit @ Hôpital Universitaire de Mirebalais - 12/03/2018 15:06",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/visit/44892810-75e5-49fc-b1a1-dc1732f424fb"
              }
            ]
          },
          "encounterProviders": [
            {
              "uuid": "2451f28f-892e-4696-844d-e75d35b2ac5c",
              "display": "Mark Goodrich: Consulting Clinician",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/f767d819-52d2-4e78-9845-a9fa399cfa75/encounterprovider/2451f28f-892e-4696-844d-e75d35b2ac5c"
                }
              ]
            }
          ],
          "links": [
            {
              "rel": "self",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/f767d819-52d2-4e78-9845-a9fa399cfa75"
            },
            {
              "rel": "full",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/f767d819-52d2-4e78-9845-a9fa399cfa75?v=full"
            }
          ],
          "resourceVersion": "1.9"
        },
        {
          "uuid": "f58998f1-b03b-4936-95c8-2a0a565917a4",
          "display": "Primary Care Adult Initial Consult 12/03/2018",
          "encounterDatetime": "2018-03-12T15:23:14.000-0400",
          "patient": {
            "uuid": "e3d9220d-8b08-4218-956d-825687719936",
            "display": "Y2DJKC - Neil Young",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/e3d9220d-8b08-4218-956d-825687719936"
              }
            ]
          },
          "location": {
            "uuid": "083e75b0-5959-11e4-8ed6-0800200c9a66",
            "display": "CDI Klinik Ekstèn Jeneral",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/083e75b0-5959-11e4-8ed6-0800200c9a66"
              }
            ]
          },
          "form": {
            "uuid": "40f51770-0267-11e6-a837-0800200c9a66",
            "display": "Primary Care Peds Initial",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/form/40f51770-0267-11e6-a837-0800200c9a66"
              }
            ]
          },
          "encounterType": {
            "uuid": "27d3a180-031b-11e6-a837-0800200c9a66",
            "display": "Consultation externe initiale adulte",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/encountertype/27d3a180-031b-11e6-a837-0800200c9a66"
              }
            ]
          },
          "obs": [
            {
              "uuid": "2e675bc7-af4c-4b8b-8989-7ed52c8fb2a8",
              "display": "Laboratory test ordered, coded: Hématocrite",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/obs/2e675bc7-af4c-4b8b-8989-7ed52c8fb2a8"
                }
              ]
            },
            {
              "uuid": "a24c6148-5450-4b90-8fe6-4ee463645ec3",
              "display": "Laboratory test ordered, coded: Hémoglobine",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/obs/a24c6148-5450-4b90-8fe6-4ee463645ec3"
                }
              ]
            },
            {
              "uuid": "e9558a04-8946-460c-9048-e1c4ddc22a07",
              "display": "Clinical management plan comment: test",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/obs/e9558a04-8946-460c-9048-e1c4ddc22a07"
                }
              ]
            },
            {
              "uuid": "60875864-39b9-47ee-9d45-faf81119fc0f",
              "display": "HUM Disposition construct: Admettre à l'hôpital, 41",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/obs/60875864-39b9-47ee-9d45-faf81119fc0f"
                }
              ]
            }
          ],
          "orders": [],
          "voided": false,
          "visit": {
            "uuid": "44892810-75e5-49fc-b1a1-dc1732f424fb",
            "display": "Clinic or Hospital Visit @ Hôpital Universitaire de Mirebalais - 12/03/2018 15:06",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/visit/44892810-75e5-49fc-b1a1-dc1732f424fb"
              }
            ]
          },
          "encounterProviders": [
            {
              "uuid": "6e19c210-5eea-4afe-8143-6b6ac36c00ed",
              "display": "Mark Goodrich: Consulting Clinician",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/f58998f1-b03b-4936-95c8-2a0a565917a4/encounterprovider/6e19c210-5eea-4afe-8143-6b6ac36c00ed"
                }
              ]
            }
          ],
          "links": [
            {
              "rel": "self",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/f58998f1-b03b-4936-95c8-2a0a565917a4"
            },
            {
              "rel": "full",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/f58998f1-b03b-4936-95c8-2a0a565917a4?v=full"
            }
          ],
          "resourceVersion": "1.9"
        },
        {
          "uuid": "57c7466f-b3e9-4a0b-a473-f839030609f1",
          "display": "Primary Care Adult Followup Consult 12/03/2018",
          "encounterDatetime": "2018-03-12T15:23:09.000-0400",
          "patient": {
            "uuid": "e3d9220d-8b08-4218-956d-825687719936",
            "display": "Y2DJKC - Neil Young",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/e3d9220d-8b08-4218-956d-825687719936"
              }
            ]
          },
          "location": {
            "uuid": "083e75b0-5959-11e4-8ed6-0800200c9a66",
            "display": "CDI Klinik Ekstèn Jeneral",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/083e75b0-5959-11e4-8ed6-0800200c9a66"
              }
            ]
          },
          "form": {
            "uuid": "343ba950-0324-11e6-a837-0800200c9a66",
            "display": "Primary Care Peds Initial",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/form/343ba950-0324-11e6-a837-0800200c9a66"
              }
            ]
          },
          "encounterType": {
            "uuid": "27d3a181-031b-11e6-a837-0800200c9a66",
            "display": "Consultation externe de suivi adulte",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/encountertype/27d3a181-031b-11e6-a837-0800200c9a66"
              }
            ]
          },
          "obs": [],
          "orders": [],
          "voided": false,
          "visit": {
            "uuid": "44892810-75e5-49fc-b1a1-dc1732f424fb",
            "display": "Clinic or Hospital Visit @ Hôpital Universitaire de Mirebalais - 12/03/2018 15:06",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/visit/44892810-75e5-49fc-b1a1-dc1732f424fb"
              }
            ]
          },
          "encounterProviders": [
            {
              "uuid": "c974dd79-81cc-469b-87a2-42c5d02483d5",
              "display": "Mark Goodrich: Consulting Clinician",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/57c7466f-b3e9-4a0b-a473-f839030609f1/encounterprovider/c974dd79-81cc-469b-87a2-42c5d02483d5"
                }
              ]
            }
          ],
          "links": [
            {
              "rel": "self",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/57c7466f-b3e9-4a0b-a473-f839030609f1"
            },
            {
              "rel": "full",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/57c7466f-b3e9-4a0b-a473-f839030609f1?v=full"
            }
          ],
          "resourceVersion": "1.9"
        },
        {
          "uuid": "70e17b29-a68d-496a-99dc-78bf2a0c7f88",
          "display": "Inscription 12/03/2018",
          "encounterDatetime": "2018-03-12T15:06:58.000-0400",
          "patient": {
            "uuid": "e3d9220d-8b08-4218-956d-825687719936",
            "display": "Y2DJKC - Neil Young",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/e3d9220d-8b08-4218-956d-825687719936"
              }
            ]
          },
          "location": {
            "uuid": "11857d80-5959-11e4-8ed6-0800200c9a66",
            "display": "CDI Klinik Ekstèn Jeneral Biwo Randevou",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/11857d80-5959-11e4-8ed6-0800200c9a66"
              }
            ]
          },
          "form": {
            "uuid": "8757a568-23d1-4e18-907b-728b56ca7756",
            "display": "Inscription",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/form/8757a568-23d1-4e18-907b-728b56ca7756"
              }
            ]
          },
          "encounterType": {
            "uuid": "55a0d3ea-a4d7-4e88-8f01-5aceb2d3c61b",
            "display": "Inscription",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/encountertype/55a0d3ea-a4d7-4e88-8f01-5aceb2d3c61b"
              }
            ]
          },
          "obs": [
            {
              "uuid": "b3907823-50cb-42c7-94f5-e7e795746233",
              "display": "Informations sur le règlement: 232, 50,0",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/obs/b3907823-50cb-42c7-94f5-e7e795746233"
                }
              ]
            },
            {
              "uuid": "9d9feb18-64e3-4aea-85d0-7f64f24777f5",
              "display": "Type de visite: Laboratoire uniquement",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/obs/9d9feb18-64e3-4aea-85d0-7f64f24777f5"
                }
              ]
            }
          ],
          "orders": [],
          "voided": false,
          "visit": {
            "uuid": "44892810-75e5-49fc-b1a1-dc1732f424fb",
            "display": "Clinic or Hospital Visit @ Hôpital Universitaire de Mirebalais - 12/03/2018 15:06",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/visit/44892810-75e5-49fc-b1a1-dc1732f424fb"
              }
            ]
          },
          "encounterProviders": [
            {
              "uuid": "f43d5281-854d-4e1d-a82f-1842d29478e5",
              "display": "Mark Goodrich: Administrative Clerk",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/70e17b29-a68d-496a-99dc-78bf2a0c7f88/encounterprovider/f43d5281-854d-4e1d-a82f-1842d29478e5"
                }
              ]
            }
          ],
          "links": [
            {
              "rel": "self",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/70e17b29-a68d-496a-99dc-78bf2a0c7f88"
            },
            {
              "rel": "full",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/70e17b29-a68d-496a-99dc-78bf2a0c7f88?v=full"
            }
          ],
          "resourceVersion": "1.9"
        }
      ]
    }
  ];


  it('should return the initial state', () => {
    const reducer = createQueueReducer();
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return all patients if encounter type not specified', () => {

    const reducer = createQueueReducer();
    const queue = reducer([], {
      type:VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
      visits: sampleVisits
    });

    expect(queue.list.length).toBe(2);
    expect(queue.list[0].patient.display).toBe("Y2A73V - Bob Dylan");
    expect(queue.list[1].patient.display).toBe("Y2DJKC - Neil Young");

  });

  it('should exclude patients who already have encounter of certain type', () => {

    const reducer = createQueueReducer('4fb47712-34a6-40d2-8ed3-e153abbd25b7');
    const queue = reducer([], {
      type:VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
      visits: sampleVisits
    });

    expect(queue.list.length).toBe(1);
    expect(queue.list[0].patient.display).toBe("Y2A73V - Bob Dylan");

  });
});
