import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { OpenMRSForm } from '@openmrs/react-components';
import BloodPressureForm from './BloodPressureForm';

let props, store;
let mountedComponentFull;
let mountedComponentShallow;

const mockStore = configureMockStore();

const bloodPressureFormFull = () => {
  if (!mountedComponentFull) {
    mountedComponentFull = mount(
      <Provider store={store}>
        <BloodPressureForm {...props} />
      </Provider>);
  }
  return mountedComponentFull;
};

const bloodPressureFormShallow = () => {
  if (!mountedComponentShallow) {
    mountedComponentShallow = mount(
      <Provider store={store}>
        <BloodPressureForm {...props} />
      </Provider>);
  }
  return mountedComponentShallow;
};

describe('Component: BloodPressureForm', () => {
  beforeEach(() => {
    props = {};
    store = mockStore(
      {
        selected: {
          patient: {
            patient: {
              uuid: "abc"
            },
            visit: {
              uuid: "def"
            }
          },
        }
      });
    mountedComponentFull = undefined;
  });

  it('renders properly', () => {
    expect(toJson(bloodPressureFormShallow())).toMatchSnapshot();
    expect(bloodPressureFormFull().find(OpenMRSForm).length).toBe(1);
  });


});
