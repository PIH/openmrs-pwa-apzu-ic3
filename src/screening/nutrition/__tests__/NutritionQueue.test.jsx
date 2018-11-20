import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {DataGrid, patientActions} from '@openmrs/react-components';
import NutritionQueue from '../NutritionQueue';
import {VISIT_REPRESENTATION} from "../../../constants";
import ic3PatientActions from "../../../patient/patientActions";
import utils from "../../../utils";

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const nutritionQueue = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <NutritionQueue {...props} />
      </Provider>);
  }
  return mountedComponent;
};

describe('Component: NutritionQueue', () => {
  beforeEach(() => {
    props = {
      session: {
        sessionLocation: {
          uuid: 'abc'
        }
      }};
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
            isUpdating: false,
            selected: null
          }
        },
      });
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(toJson(nutritionQueue())).toMatchSnapshot();
    expect(nutritionQueue().find(DataGrid).length).toBe(2);
    expect(nutritionQueue().find(DataGrid).get(0).props.rowSelectedActionCreators.length).toBe(2);
    expect(nutritionQueue().find(DataGrid).get(0).props.rowSelectedActionCreators[1]().payload.args[0]).toBe("/screening/nutrition/form");
    expect(store.getActions()).toContainEqual(patientActions.clearSelectedPatient());
    expect(store.getActions()).toContainEqual(
      ic3PatientActions.getIC3Patients(props.session.sessionLocation.uuid, utils.formatReportRestDate(new Date())));
  });

});
