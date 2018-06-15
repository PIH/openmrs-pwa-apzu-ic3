import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { OpenMRSForm } from '@openmrs/react-components';
import NutritionForm from './NutritionForm';

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const nutritionForm = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <NutritionForm {...props} />
      </Provider>);
  }
  return mountedComponent;
};

describe('Component: nutritionForm', () => {
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
    expect(toJson(nutritionForm())).toMatchSnapshot();
    expect(nutritionForm().find(OpenMRSForm).length).toBe(1);
  });

});
