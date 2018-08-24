import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { DataGrid, PatientSearch } from '@openmrs/react-components';
import { spy } from 'sinon';
import SearchPatient from '../SearchPatient';
import patientActions from '../../patient/patientActions';

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

spy(SearchPatient.prototype, 'componentDidMount');

const searchPatient = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <SearchPatient {...props}></SearchPatient>
      </Provider>);
  }
  return mountedComponent;
};

describe('Component: SearchPatient', () => {
  beforeEach(() => {
    props = {
      columnDefs: []
    };
    store = mockStore(
      {
        dispatch: {},
        openmrs: {
          patientSearch: {}
        },
        selectedPatient: null
      });
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(toJson(searchPatient())).toMatchSnapshot();
    expect(searchPatient().find(PatientSearch).length).toBe(1);
    expect(searchPatient().find(DataGrid).props().rowSelectedActionCreators.length).toBe(1);
    expect(searchPatient().find(DataGrid).props().rowSelectedActionCreators[0].name).toBe("redirectToInfoPageActionCreator");
    expect(searchPatient().find(DataGrid).props().rowSelectedActionCreators[0]().payload.args[0]).toBe("/checkin/checkInPage");
    expect(SearchPatient.prototype.componentDidMount.calledOnce).toBe(true);
    expect(store.getActions()).toContainEqual(patientActions.clearPatientSelected());
  });

});

