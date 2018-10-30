import nurseFilters from '../nurseFilters';
import { ENCOUNTER_TYPES } from "../../../constants";

describe('nurseFilters', () => {

  it('completed: should filter out patients with nurse encounter', () => {

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
                uuid: ENCOUNTER_TYPES.NurseEvaluationEncounterType.uuid
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
    ].filter(nurseFilters.completed);

    expect(results.length).toBe(1);
    expect(results[0].uuid).toBe("abcd");
  });

});

