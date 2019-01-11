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
    props = {
      formInstanceId: "test-uuid"
    };
    store = mockStore(
      {
        openmrs: {
          patients: {
            set: {
              "abc": {
                uuid: "abc",
                visit: {
                  uuid: "def"
                }
              }
            },
            selected: "abc"
          },
          session: {
            sessionLocation: {
              uuid: ''
            }
          },
        }
      });
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    toJson(nutritionForm());
  });

});
