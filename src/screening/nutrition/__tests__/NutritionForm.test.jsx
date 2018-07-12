import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import MockRouter from 'react-mock-router';
import { Container } from 'bahmni-form-controls';
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
    expect(nutritionForm().find(Container).length).toBe(1);
  });

});
