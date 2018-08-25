import { Patient, VISIT_TYPES  } from '@openmrs/react-components';
import reducer from '../patientsReducer';
import CHECK_IN_TYPES from '../../checkin/checkInTypes';

describe('patient list reducer', () => {

  const samplePatient = new Patient();
  samplePatient.uuid='abcd-1234';

  const anotherSamplePatient = new Patient();
  anotherSamplePatient.uuid='efgh-5678';

  const sampleVisit = {
    uuid: 'ijkl-9012',
    patient: {
      uuid: 'abcd-1234'
    }
  };

  const anotherSampleVisit = {
    uuid: 'mnop-3456',
    patient: {
      uuid: 'efgh-5678'
    }
  };

  const newPatientSampleVisit = {
    uuid: 'qrst-7890',
    patient: {
      uuid: 'ijkl-9012',
    }
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return patients as Object map', () => {
    const patients = reducer({}, {
      type:CHECK_IN_TYPES.CHECK_IN.EXPECTED_TO_CHECK_IN,
      patients: [samplePatient, anotherSamplePatient]
    });

    expect(patients['abcd-1234']).toEqual({ "uuid": "abcd-1234" });
    expect(patients['efgh-5678']).toEqual({ "uuid": "efgh-5678" });
  });

  it('should handle empty patient list', () => {
    const patients = reducer({}, {
      type:CHECK_IN_TYPES.CHECK_IN.EXPECTED_TO_CHECK_IN,
      patients: []
    });

    expect(patients).toEqual({});
  });

  it('should handle undefined patient list', () => {
    const patients = reducer({}, {
      type:CHECK_IN_TYPES.CHECK_IN.EXPECTED_TO_CHECK_IN
    });

    expect(patients).toEqual({});
  });

  it('should return patients with visits as Object map', () => {
    const patients = reducer({
      'abcd-1234': { "uuid": "abcd-1234" },
      'efgh-5678': { "uuid": "efgh-5678" },
    }, {
      type: VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
      visits: [sampleVisit, anotherSampleVisit]
    });

    expect(patients['abcd-1234']['visit']).toEqual(sampleVisit);
    expect(patients['efgh-5678']['visit']).toEqual(anotherSampleVisit);
  });

  it('should handle empty visits list', () => {
    const patients = reducer({
      'abcd-1234': { "uuid": "abcd-1234" },
      'efgh-5678': { "uuid": "efgh-5678" },
    }, {
      type:VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
      visits: []
    });

    expect(patients['abcd-1234']).toEqual({ "uuid": "abcd-1234" });
    expect(patients['efgh-5678']).toEqual({ "uuid": "efgh-5678" });
  });

  it('should handle undefined visits list', () => {
    const patients = reducer({
      'abcd-1234': { "uuid": "abcd-1234" },
      'efgh-5678': { "uuid": "efgh-5678" },
    }, {
      type:VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED
    });

    expect(patients['abcd-1234']).toEqual({ "uuid": "abcd-1234" });
    expect(patients['efgh-5678']).toEqual({ "uuid": "efgh-5678" });
  });

  it('should add patient with active visit but not in Object map', () => {
    const patients = reducer({
      'abcd-1234': { "uuid": "abcd-1234" },
      'efgh-5678': { "uuid": "efgh-5678" },
    }, {
      type: VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
      visits: [newPatientSampleVisit]
    });

    expect(patients['ijkl-9012']).toEqual(
      { "uuid": "ijkl-9012",
        "visit":
          {
            "patient":
              {
                "uuid": "ijkl-9012"
              },
            "uuid": "qrst-7890"
          }
      });
  });

});
