import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import CheckInForm from '../CheckinForm';

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const checkInForm = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <CheckInForm {...props} />
      </Provider>);
  }
  return mountedComponent;
};

describe('Component: CheckInForm', () => {
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
    expect(toJson(checkInForm())).toMatchSnapshot();
  });

});
