import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {DataGrid, PatientSearch, patientActions} from '@openmrs/react-components';
import { spy } from 'sinon';
import SearchPatient from '../SearchPatient';

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const searchPatient = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <SearchPatient {...props}></SearchPatient>
      </Provider>);
  }
  return mountedComponent;
};

describe('Component: SearchPatient', () => {
  beforeEach(() => {
    props = {
      columnDefs: []
    };
    store = mockStore(
      {
        dispatch: {},
        openmrs: {
          patientSearch: {
            results: [
              {
                address: "",
                age: 18,
                gender: "M",
                identifiers: [
                  {
                    identifier: "NOP 55 CCC",
                    preferred: true
                  }
                ]
              }
            ]
          },
          selectedPatient: null
        },
      });
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(toJson(searchPatient())).toMatchSnapshot();
    expect(searchPatient().find(PatientSearch).length).toBe(1);
    expect(searchPatient().find(DataGrid).props().rowSelectedActionCreators.length).toBe(4);
    expect(searchPatient().find(DataGrid).props().rowSelectedActionCreators[0].name).toBe("updatePatientInStore");
    expect(searchPatient().find(DataGrid).props().rowSelectedActionCreators[1].name).toBe("setSelectedPatient");
    expect(searchPatient().find(DataGrid).props().rowSelectedActionCreators[2].name).toBe("getPatientApptData");
    expect(searchPatient().find(DataGrid).props().rowSelectedActionCreators[3].name).toBe("");
    expect(searchPatient().find(DataGrid).props().rowSelectedActionCreators[3]().payload.args[0]).toBe("/checkin/checkInPage");
    expect(store.getActions()).toContainEqual(patientActions.clearSelectedPatient());
  });

});

