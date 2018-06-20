import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { DataGrid } from '@openmrs/react-components';
import BloodPressureQueue from '../BloodPressureQueue';

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
    props = {};
    store = mockStore(
      {
        dispatch: {},
        screening: {
          bloodPressureQueue: {
            list: []
          }
        }
      });
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(toJson(bloodPressureQueue())).toMatchSnapshot();
    expect(bloodPressureQueue().find(DataGrid).length).toBe(1);
    expect(bloodPressureQueue().find(DataGrid).props().rowSelectedActionCreators.length).toBe(1);
    expect(bloodPressureQueue().find(DataGrid).props().rowSelectedActionCreators[0].name).toBe("redirectToInfoPageActionCreator");
    expect(bloodPressureQueue().find(DataGrid).props().rowSelectedActionCreators[0]().payload.args[0]).toBe("/screening/bloodPressure/form");
  });

});
