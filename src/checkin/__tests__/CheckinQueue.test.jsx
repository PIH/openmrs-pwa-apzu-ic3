import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { CardList } from '@openmrs/react-components';
import CheckInQueue from '../CheckInQueue';

jest.mock('@openmrs/react-components', () => {
  return {
    patientObjByEncounterTypeFilter: jest.fn(),
    selectors: {
      getPatientStore: jest.fn((state) => ({
        1: {
          name: 'somePatient'
        }
      })),
      isPatientStoreUpdating: jest.fn()
    },
    patientActions: {
      clearSelectedPatient: jest.fn(),
      setSelectedPatient: jest.fn(),
    },
    CardList: () => (
      <div>
        <span>card list component</span>
      </div>
    ),
  }
});

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const checkInQueue = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <CheckInQueue {...props} >
        </CheckInQueue>
      </Provider>);
  }
  return mountedComponent;
};

describe('Component: CheckInQueue', () => {
  beforeEach(() => {
    props = {};
    store = mockStore(
      {
        dispatch: {},
        openmrs: {
          session: {
            sessionLocation: {
              uuid: 'abc'
            }
          },
          patients: {
            set: [],
            selected: null
          }
        },
      });
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    //aexpect(toJson(checkInQueue())).toMatchSnapshot();
    //expect(checkInQueue().find(CardList).props().rowSelectedActionCreators.length).toBe(3);
    //expect(checkInQueue().find(DataGrid).props().rowSelectedActionCreators[0].name).toBe("redirectToCheckinPageActionCreator");
    //expect(checkInQueue().find(DataGrid).props().rowSelectedActionCreators[0]().payload.args[0]).toBe("/checkin/checkInPage");
  });

});

