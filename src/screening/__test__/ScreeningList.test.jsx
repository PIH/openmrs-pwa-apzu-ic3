import React from 'react';
import { mount } from 'enzyme';
import { ListGroup } from 'react-bootstrap';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ScreeningList from '../ScreeningList';

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const screeningList = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <ScreeningList {...props} />
      </Provider>
    );
  }
  return mountedComponent;
};

describe('Component: Screening List', () => {

  props = {
    patient: {}
  };

  store = mockStore();

  it('renders properly', () => {
    expect(screeningList().find(ListGroup).length).toBe(1);
  });

});
