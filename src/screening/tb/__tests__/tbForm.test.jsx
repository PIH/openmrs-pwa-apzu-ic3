import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import MockRouter from 'react-mock-router';
import TbForm from '../TbForm';

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const TBForm = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <MockRouter>
          <TbForm {...props} />
        </MockRouter>
      </Provider>);
  }
  return mountedComponent;
};

describe('Component: TbForm', () => {
  beforeEach(() => {
    props = {};
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
        }
      });
    mountedComponent = undefined;
  });

  it.skip('renders properly', () => {
    toJson(TBForm());
  });

});
