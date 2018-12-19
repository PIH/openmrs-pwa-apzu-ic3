import tbFilters from '../tbFilters';
import { ENCOUNTER_TYPES } from "../../../constants";

// UnSkip this when the TbFilters is implemented
describe.skip('tbFilters', () => {

  it.skip('completed: should filter out patients with tb encounter', () => {

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
                uuid: ENCOUNTER_TYPES.NutritionEncounterType.uuid
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
    ].filter(tbFilters.completed);

    expect(results.length).toBe(1);
    expect(results[0].uuid).toBe("abcd");
  });

});

