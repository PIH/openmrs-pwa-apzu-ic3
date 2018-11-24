import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {DataGrid, patientActions} from '@openmrs/react-components';
import BloodPressureQueue from '../BloodPressureQueue';
import {VISIT_REPRESENTATION} from "../../../constants";
import ic3PatientActions from "../../../patient/patientActions";
import utils from "../../../utils";

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
          patients: {
            set: {},
            loading: true,
            selected: null
          }
        },

      });
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    //expect(toJson(bloodPressureQueue())).toMatchSnapshot();
    expect(bloodPressureQueue().find(DataGrid).length).toBe(2);
    expect(bloodPressureQueue().find(DataGrid).get(0).props.rowSelectedActionCreators.length).toBe(2);
    expect(bloodPressureQueue().find(DataGrid).get(0).props.rowSelectedActionCreators[1]().payload.args[0]).toBe("/screening/bloodPressure/form");
    expect(store.getActions()).toContainEqual(patientActions.clearSelectedPatient());
    expect(store.getActions()).toContainEqual(
      ic3PatientActions.getIC3Patients(props.session.sessionLocation.uuid, utils.formatReportRestDate(new Date())));
  });

});
