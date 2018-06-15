import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { DataGrid } from '@openmrs/react-components';
import NutritionQueue from './NutritionQueue';

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
    props = {};
    store = mockStore(
      {
        dispatch: {},
        screening: {
          nutritionQueue: {
            list: []
          }
        }
      });
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(toJson(nutritionQueue())).toMatchSnapshot();
    expect(nutritionQueue().find(DataGrid).length).toBe(1);
    expect(nutritionQueue().find(DataGrid).props().rowSelectedActionCreators.length).toBe(1);
    expect(nutritionQueue().find(DataGrid).props().rowSelectedActionCreators[0].name).toBe("redirectToInfoPageActionCreator");
    expect(nutritionQueue().find(DataGrid).props().rowSelectedActionCreators[0]().payload.args[0]).toBe("/screening/nutrition/form");
  });

});