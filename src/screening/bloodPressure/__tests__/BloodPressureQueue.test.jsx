import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { CardList, patientActions } from '@openmrs/react-components';
import BloodPressureQueue from '../BloodPressureQueue';
import { VISIT_REPRESENTATION } from "../../../constants";
import ic3PatientActions from "../../../patient/patientActions";
import utils from "../../../utils";


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
  };
});

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const bloodPressureQueue = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <BloodPressureQueue {...props} />
      </Provider>);
  }
  return mountedComponent;
};

describe('Component: BloodPressureQueue', () => {
  beforeEach(() => {
    props = {
      session: {
        sessionLocation: {
          uuid: 'abc'
        }
      }
    };
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
            loading: true,
            selected: null
          }
        },
        router: {
          location: {
            pathname: '/'
          }
        }
      });
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    //expect(toJson(bloodPressureQueue())).toMatchSnapshot();
    expect(bloodPressureQueue().find(CardList).length).toBe(1);
    expect(bloodPressureQueue().find(CardList).get(0).props.rowSelectedActionCreators.length).toBe(3);
    expect(bloodPressureQueue().find(CardList).get(0).props.rowSelectedActionCreators[1]().payload.args[0]).toBe("/screening");
  });

});
