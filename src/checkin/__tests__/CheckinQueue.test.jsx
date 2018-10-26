import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { DataGrid } from '@openmrs/react-components';
import CheckInQueue from '../CheckInQueue';

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const checkInQueue = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <CheckInQueue {...props} >
        </CheckInQueue>
      </Provider>);
  }
  return mountedComponent;
};

describe('Component: CheckInQueue', () => {
  beforeEach(() => {
    props = {};
    store = mockStore(
      {
        dispatch: {},
        openmrs: {
          session: {
            sessionLocation: {
              uuid: 'abc'
            }
          },
          patients: {
            set: [],
            selected: null
          }
        },
      });
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    //aexpect(toJson(checkInQueue())).toMatchSnapshot();
    expect(checkInQueue().find(DataGrid).props().rowSelectedActionCreators.length).toBe(2);
    //expect(checkInQueue().find(DataGrid).props().rowSelectedActionCreators[0].name).toBe("redirectToCheckinPageActionCreator");
    //expect(checkInQueue().find(DataGrid).props().rowSelectedActionCreators[0]().payload.args[0]).toBe("/checkin/checkInPage");
  });

});

