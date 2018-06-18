import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { spy } from 'sinon';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { DataGrid } from '@openmrs/react-components';
import Queue from './Queue';

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

spy(Queue.prototype, 'componentDidMount');

const queue = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <Queue {... props} />
      </Provider>
    );
  }
  return mountedComponent;
};

describe('Component: Queue', () => {
  beforeEach(() => {
    // in an actual implementation of a queue, these would be mapped in
    props = {
      rowData: [],
      dispatch: () => {}
    };
    store = mockStore({});
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(toJson(queue())).toMatchSnapshot();
    expect(queue().find(DataGrid).length).toBe(1);
    expect(queue().find(DataGrid).props().rowSelectedActionCreators.length).toBe(1);
    expect(queue().find(DataGrid).props().rowSelectedActionCreators[0].name).toBe("redirectToInfoPageActionCreator");
    expect(queue().find(DataGrid).props().rowSelectedActionCreators[0]().payload.args[0]).toBe("/");
    expect(Queue.prototype.componentDidMount.calledOnce).toBe(true);
  });
});
