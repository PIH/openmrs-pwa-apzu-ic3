import checkInFilters from '../checkInFilters';
import { ENCOUNTER_TYPES } from "../../constants";

describe('checkInFilters', () => {

  // todo extract out into util method
  const applyFilters =  (list, filters) => {
    if (filters.length === 0) {
      return list;
    } else {
      return applyFilters(list.filter(filters[filters.length - 1]), filters.slice(0, -1));
    }
  };

  it('should filter out patient with checkin but include patient without visit', () => {

    const results = applyFilters([
      {
        uuid: 'abcd',
        age: 20
      },
      {
        uuid: '5678',
        age: 20,
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
    ], checkInFilters.required);

    expect(results.length).toBe(1);
    expect(results[0].uuid).toBe("abcd");
  });

  it('should include patients with visit but no check-in encounter', () => {

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
                uuid: 'not-check-in-type'
              }
            }
          ]
        }
      },
    ], checkInFilters.required);

    expect(results.length).toBe(1);
    expect(results[0].uuid).toBe("5678");
  });

});

