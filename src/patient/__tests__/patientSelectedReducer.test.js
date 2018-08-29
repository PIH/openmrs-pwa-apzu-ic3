import { GRID_TYPES } from "@openmrs/react-components";
import PATIENT_TYPES from '../patientTypes';
import reducers from '../patientSelectedReducer';

describe('patient selected reducer', () => {

  it('should return the initial state', () => {
    expect(reducers(undefined, {})).toBeNull();
  });

  it('grid row selected should add patient to selected', () => {

    const patient = {};
    patient.uuid = 'abc-123';

    expect(reducers(undefined, {
      type: GRID_TYPES.ROW_SELECTED,
      row: patient
    })).toEqual(patient.uuid);

  });

  it('grid row cleared should remove from selected', () => {

    const patient = {};

    expect(reducers({ patient: patient }, {
      type: GRID_TYPES.CLEAR_SELECTED,
    })).toBeNull();

  });

  it('clear patient selected should remove from selected', () => {

    const patient = {};

    expect(reducers({ patient: patient }, {
      type: PATIENT_TYPES.CLEAR_SELECTED,
    })).toBeNull();

  });




});
