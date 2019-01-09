import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { PatientSearch, patientActions } from '@openmrs/react-components';
import { spy } from 'sinon';
import SearchPatient from '../SearchPatient';

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const searchPatient = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <SearchPatient {...props} />
      </Provider>);
  }
  return mountedComponent;
};

describe('Component: SearchPatient', () => {
  beforeEach(() => {
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
          selectedPatient: null,
          metadata: {
            locations: [{
              attributes: [],
              display: "Binje Outreach Clinic",
              name: "Binje Outreach Clinic",
              tags: [],
              uuid: "abc"
            }]
          },
          session: {
            sessionLocation: {
              uuid: 'abc'
            }
          },
        },
      });
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    //expect(toJson(searchPatient())).toMatchSnapshot();
    expect(searchPatient().find(PatientSearch).length).toBe(1);
    expect(store.getActions()).toContainEqual(patientActions.clearSelectedPatient());
  });

});

