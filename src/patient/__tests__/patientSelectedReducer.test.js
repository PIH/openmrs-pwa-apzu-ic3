import { GRID_TYPES } from "@openmrs/react-components";
import { Patient } from '@openmrs/react-components';
import PATIENT_TYPES from '../patientTypes';
import reducers from '../patientSelectedReducer';

describe('patient selected reducer', () => {

  it('should return the initial state', () => {
    expect(reducers(undefined, {})).toEqual({});
  });

  it('grid row selected should add patient to selected', () => {

    const patient = new Patient();

    expect(reducers(undefined, {
      type: GRID_TYPES.ROW_SELECTED,
      row: patient
    })).toEqual(patient);

  });

  it('grid row cleared should remove from selected', () => {

    const patient = new Patient();

    expect(reducers({ patient: patient }, {
      type: GRID_TYPES.CLEAR_SELECTED,
    })).toEqual({
      patient: {},
      uuid: null
    });

  });

  it('clear patient selected should remove from selected', () => {

    const patient = new Patient();

    expect(reducers({ patient: patient }, {
      type: PATIENT_TYPES.CLEAR_SELECTED,
    })).toEqual({
      patient: {},
      uuid: null
    });

  });




});
