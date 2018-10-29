import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {DataGrid, visitActions, patientActions} from '@openmrs/react-components';
import NutritionQueue from '../NutritionQueue';
import {ACTIVE_VISITS_REP, VISIT_REPRESENTATION} from "../../../constants";

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
      });
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(toJson(nutritionQueue())).toMatchSnapshot();
    expect(nutritionQueue().find(DataGrid).length).toBe(1);
    expect(nutritionQueue().find(DataGrid).props().rowSelectedActionCreators.length).toBe(2);
    expect(nutritionQueue().find(DataGrid).props().rowSelectedActionCreators[1]().payload.args[0]).toBe("/screening/nutrition/form");
    expect(store.getActions()).toContainEqual(patientActions.clearSelectedPatient());
    expect(store.getActions()).toContainEqual(visitActions.fetchActiveVisits(props.session.sessionLocation.uuid, ACTIVE_VISITS_REP));
  });

});
