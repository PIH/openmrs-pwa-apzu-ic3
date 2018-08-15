import activeVisitFilters from '../activeVisitsFilters';
import { ENCOUNTER_TYPES } from "../../constants";

describe('activeVisitFilters', () => {

  // todo extract out into util method
  const applyFilters =  (list, filters) => {
    if (filters.length === 0) {
      return list;
    } else {
      return applyFilters(list.filter(filters[filters.length - 1]), filters.slice(0, -1));
    }
  };

  it('should filter out patients without visit', () => {

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
    ], activeVisitFilters);

    expect(results.length).toBe(1);
    expect(results[0].uuid).toBe("5678");
  });

  it('should filter out patients without check-in', () => {

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
    ], activeVisitFilters);

    expect(results.length).toBe(1);
    expect(results[0].uuid).toBe("abcd");
  });

});

