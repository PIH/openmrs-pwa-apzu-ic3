import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {CardList, patientActions} from '@openmrs/react-components';
import NutritionQueue from '../NutritionQueue';
import {VISIT_REPRESENTATION} from "../../../constants";
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
  }
});


let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const nutritionQueue = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <NutritionQueue {...props} />
      </Provider>);
  }
  return mountedComponent;
};

describe('Component: NutritionQueue', () => {
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
        router: {
          location: {
            pathname: '/'
          }
        }
      });
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    //expect(toJson(nutritionQueue())).toMatchSnapshot();
    expect(nutritionQueue().find(CardList).length).toBe(1);
    expect(nutritionQueue().find(CardList).get(0).props.rowSelectedActionCreators.length).toBe(3);
    expect(nutritionQueue().find(CardList).get(0).props.rowSelectedActionCreators[2]().payload.args[0]).toBe("/screening");
  });

});
