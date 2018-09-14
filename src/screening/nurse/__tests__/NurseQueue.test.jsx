import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { DataGrid, visitActions } from '@openmrs/react-components';
import NurseQueue from '../NurseQueue';
import patientActions from '../../../patient/patientActions';
import {VISIT_REPRESENTATION} from "../../../constants";

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const nurseQueue = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <NurseQueue {...props} />
      </Provider>);
  }
  return mountedComponent;
};

describe('Component: NurseQueue', () => {
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
          }
        },
        patients: []
      });
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(toJson(nurseQueue())).toMatchSnapshot();
    expect(nurseQueue().find(DataGrid).length).toBe(1);
    expect(nurseQueue().find(DataGrid).props().rowSelectedActionCreators.length).toBe(1);
    let rowSelectedAction = {
      "pathname": '/nurse/nursePage',
      "state": {
        "queueLink": '/screening/nurse/queue'
      }
    };
    expect(nurseQueue().find(DataGrid).props().rowSelectedActionCreators[0]().payload.args[0]).toEqual(rowSelectedAction);
    expect(store.getActions()).toContainEqual(patientActions.clearPatientSelected());
    expect(store.getActions()).toContainEqual(visitActions.fetchActiveVisits("custom:" + VISIT_REPRESENTATION, props.session.sessionLocation.uuid));
  });

});
