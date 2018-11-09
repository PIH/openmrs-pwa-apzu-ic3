import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { DataGrid, visitActions, patientActions } from '@openmrs/react-components';
import NurseQueue from '../NurseQueue';
import { ACTIVE_VISITS_REP, VISIT_REPRESENTATION } from "../../../constants";

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
          },
          patients: {
            set: {},
            selected: null
          }
        },

      });
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(toJson(nurseQueue())).toMatchSnapshot();
    expect(nurseQueue().find(DataGrid).length).toBe(1);
    expect(nurseQueue().find(DataGrid).props().rowSelectedActionCreators.length).toBe(2);
    let rowSelectedAction = {
      "pathname": '/screening/nurse/nursePage',
      "state": {
        "queueLink": '/screening/nurse/queue'
      }
    };
    expect(nurseQueue().find(DataGrid).props().rowSelectedActionCreators[1]().payload.args[0]).toEqual(rowSelectedAction);
    expect(store.getActions()).toContainEqual(patientActions.clearSelectedPatient());
    expect(store.getActions()).toContainEqual(visitActions.fetchActiveVisits(props.session.sessionLocation.uuid, ACTIVE_VISITS_REP));
  });

});
