import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {DataGrid, visitActions, patientActions} from '@openmrs/react-components';
import BloodPressureQueue from '../BloodPressureQueue';
import { VISIT_REPRESENTATION } from "../../../constants";

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const bloodPressureQueue = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <BloodPressureQueue {...props} />
      </Provider>);
  }
  return mountedComponent;
};

describe('Component: BloodPressureQueue', () => {
  beforeEach(() => {
    props = {
      session: {
        sessionLocation: {
          uuid: 'abc'
        }
      }
    };
    store = mockStore(
      {
        dispatch: {},
        openmrs: {
          session: {
            sessionLocation: {
              uuid: 'abc'
            }
          },
          patients: []
        },

      });
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(toJson(bloodPressureQueue())).toMatchSnapshot();
    expect(bloodPressureQueue().find(DataGrid).length).toBe(1);
    expect(bloodPressureQueue().find(DataGrid).props().rowSelectedActionCreators.length).toBe(2);
    expect(bloodPressureQueue().find(DataGrid).props().rowSelectedActionCreators[0]().payload.args[0]).toBe("/screening/bloodPressure/form");
    expect(store.getActions()).toContainEqual(patientActions.clearSelectedPatient());
    expect(store.getActions()).toContainEqual(visitActions.fetchActiveVisits(props.session.sessionLocation.uuid));
  });

});
