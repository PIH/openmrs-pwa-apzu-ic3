import checkInFilters from '../checkInFilters';
import { ENCOUNTER_TYPES } from "../../constants";

describe('checkInFilters', () => {

  it('should filter out patient without check-in encounter', () => {

    const results = [
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
    ].filter(checkInFilters.completed);

    expect(results.length).toBe(1);
    expect(results[0].uuid).toBe("5678");
  });

});

