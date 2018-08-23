import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import MockRouter from 'react-mock-router';
import NutritionForm from '../NutritionForm';

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const nutritionForm = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <MockRouter>
          <NutritionForm {...props} />
        </MockRouter>
      </Provider>);
  }
  return mountedComponent;
};

describe('Component: NutritionForm', () => {
  beforeEach(() => {
    props = {};
    store = mockStore(
      {
        selectedPatient: {
          uuid: "abc",
          visit: {
            uuid: "def"
          }
        }
      });
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(toJson(nutritionForm())).toMatchSnapshot();
  });

});
