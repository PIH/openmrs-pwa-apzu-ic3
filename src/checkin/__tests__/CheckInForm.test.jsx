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
    props = {};
    store = mockStore(
      {
        patients: {
          "abc": {
            patient: {
              patient: {
                uuid: "abc"
              }
            },
            visit: {
              activeVisit: {
                uuid: "3a80",
                encounters: [],
                patient: {
                  uuid: "abc"
                }
              },
              uuid: "def"
            }
          }
        },
        selectedPatient: "abc"
      });
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(toJson(checkInForm())).toMatchSnapshot();
  });

});
