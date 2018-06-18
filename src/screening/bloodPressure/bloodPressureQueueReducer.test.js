import reducer from './bloodPressureQueueReducer';
import { VISIT_TYPES } from "@openmrs/react-components";

describe('bloodPressureQueueReducer', () => {

  const sampleVisits = [
    {
      "uuid": "af02b757-eb0a-4e64-b872-0091ad1d9b8a",
      "patient": {
        "uuid": "a46864ac-4cee-4e3a-a920-7b5799f1dc9a",
        "display": "Y2A73V - Bob Dylan",
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
          "voided": false,
          "deathdateEstimated": false,
          "birthtime": null,
          "resourceVersion": "1.11"
        },
        "voided": false,
        "resourceVersion": "1.8"
      },
    },
    {
      "uuid": "44892810-75e5-49fc-b1a1-dc1732f424fb",
      "patient": {
        "uuid": "e3d9220d-8b08-4218-956d-825687719936",
        "display": "Y2DJKC - Neil Young",
        "person": {
          "uuid": "e3d9220d-8b08-4218-956d-825687719936",
          "display": "Neil Young",
          "gender": "M",
          "age": 8,
          "birthdate": "2010-01-01T00:00:00.000-0500",
          "birthdateEstimated": true,
          "dead": false,
          "deathDate": null,
          "causeOfDeath": null,
          "voided": false,
          "deathdateEstimated": false,
          "birthtime": null,
          "resourceVersion": "1.11"
        },
        "voided": false,
        "resourceVersion": "1.8"
      },
    }
  ];

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  });

  it('should filter out non-adult patients', () => {
    const queue = reducer([], {
      type:VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
      visits: sampleVisits
    });

    expect(queue.list.length).toBe(1);
    expect(queue.list[0].patient.display).toBe("Y2A73V - Bob Dylan");
  });

});

