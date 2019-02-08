import bloodPressureFilters from '../bloodPressureFilters';
import { ENCOUNTER_TYPES } from "../../../constants";

describe('bloodPressureFilters', () => {

  it('required: should filter out non-adult patients', () => {

    const results = [
      {
        uuid: 'abcd',
        age: 20,
        visit: {
          encounters: [
            {
              encounterType: {
                uuid: ENCOUNTER_TYPES.CheckInEncounterType.uuid
              }
            }
          ]
        },
        alert:[  
          {  
            "alert":"Routine Blood Sugar for high risk population",
            "action":"Routine Blood Sugar for high risk population",
            "categories":[  
              "diabetes"
            ],
            "name":"routine-blood-sugar-high-risk"
          },
          {  
            "alert":"Due for BP Screening",
            "action":"Refer to BP Screening station",
            "categories":[  
              "bp",
              "screening-eligibility"
            ],
            "name":"eligible-for-bp-screening"
          },
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
    ].filter(bloodPressureFilters.required);

    expect(results.length).toBe(1);
    expect(results[0].uuid).toBe("abcd");
  });

  it('completed: should filter out patients without blood pressure encounter', () => {

    const results = [
      {
        uuid: 'abcd',
        age: 20,
        visit: {
          encounters: [
            {
              encounterType: {
                uuid: ENCOUNTER_TYPES.CheckInEncounterType.uuid
              }
            },
            {
              encounterType: {
                uuid: ENCOUNTER_TYPES.BloodPressureEncounterType.uuid
              }
            }
          ]
        }
      },
      {
        uuid: '5678',
        age: 30,
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
    ].filter(bloodPressureFilters.completed);

    expect(results.length).toBe(1);
    expect(results[0].uuid).toBe("abcd");
  });


});

