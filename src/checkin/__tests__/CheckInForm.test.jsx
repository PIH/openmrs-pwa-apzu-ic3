import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import MockRouter from 'react-mock-router';
import CheckInForm from '../CheckInForm';

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const checkInForm = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <MockRouter>
          <CheckInForm {...props} />
        </MockRouter>
      </Provider>);
  }
  return mountedComponent;
};

describe('Component: CheckInForm', () => {
  beforeEach(() => {
    props = {
      patient: {
        uuid: "abc",
        name: {
          givenName: "Claire",
          familyName: "Jones"
        },
        age: 12,
        gender: "M"
      },
      backLink: "/checkin/checkInQueue"
    };
    store = mockStore({ openmrs: {} });
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(toJson(checkInForm())).toMatchSnapshot();
  });

});
