import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {CardList} from '@openmrs/react-components';
import TbQueue from '../TbQueue';


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

const TBQueue = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <TbQueue {...props} />
      </Provider>);
  }
  return mountedComponent;
};

describe.skip('Component: TbQueue', () => {
  beforeEach(() => {
    props = {
      session: {
        sessionLocation: {
          uuid: 'abc'
        }
      }};
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
            set: {},
            isUpdating: false,
            selected: null
          }
        },
      });
    mountedComponent = undefined;
  });

  it.skip('renders properly', () => {
    //expect(toJson(nutritionQueue())).toMatchSnapshot();
    expect(TBQueue().find(CardList).length).toBe(1);
    expect(TBQueue().find(CardList).get(0).props.rowSelectedActionCreators.length).toBe(2);
    expect(TBQueue().find(CardList).get(0).props.rowSelectedActionCreators[1]().payload.args[0]).toBe("/screening");
  });

});
