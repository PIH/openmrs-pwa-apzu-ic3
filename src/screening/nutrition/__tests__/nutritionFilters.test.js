import nutritionFilters from '../nutritionFilters';
import { ENCOUNTER_TYPES } from "../../../constants";

describe('nutritionFilters', () => {

  // todo extract out into util method
  const applyFilters =  (list, filters) => {
    if (filters.length === 0) {
      return list;
    } else {
      return applyFilters(list.filter(filters[filters.length - 1]), filters.slice(0, -1));
    }
  };


  it('required: should filter out patients with nutrition encounter', () => {

    const results = applyFilters([
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
    ], nutritionFilters.required);

    expect(results.length).toBe(1);
    expect(results[0].uuid).toBe("5678");
  });

  it('completed: should filter out patients without nutrition encounter', () => {

    const results = applyFilters([
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
    ], nutritionFilters.completed);

    expect(results.length).toBe(1);
    expect(results[0].uuid).toBe("abcd");
  });

});

