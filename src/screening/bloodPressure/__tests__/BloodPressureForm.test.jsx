import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { OpenMRSForm } from '@openmrs/react-components';
import BloodPressureForm from '../BloodPressureForm';

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const bloodPressureForm = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <BloodPressureForm {...props} />
      </Provider>);
  }
  return mountedComponent;
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
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(toJson(bloodPressureForm())).toMatchSnapshot();
    expect(bloodPressureForm().find(OpenMRSForm).length).toBe(1);
  });

});
