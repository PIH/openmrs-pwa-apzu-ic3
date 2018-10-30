import nutritionFilters from '../nutritionFilters';
import { ENCOUNTER_TYPES } from "../../../constants";

describe('nutritionFilters', () => {

  it('completed: should filter out patients with nutrition encounter', () => {

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
    ].filter(nutritionFilters.completed);

    expect(results.length).toBe(1);
    expect(results[0].uuid).toBe("abcd");
  });

});

