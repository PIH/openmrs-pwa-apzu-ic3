import React from 'react'
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import HomePage from '../HomePage'
import configureMockStore from 'redux-mock-store'
import { BrowserRouter, Route } from 'react-router-dom';

let props, mountedComponent, store;

const mockStore = configureMockStore();
const homePage = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(
      <BrowserRouter><Route><HomePage {...props} /></Route></BrowserRouter>)
  }
  return mountedComponent;
};

describe('Component: HomePage', () => {
  beforeEach(() => {
    props = {};
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(toJson(homePage())).toMatchSnapshot();
    expect(homePage().find(HomePage).length).toBe(1);
    // expect(homePage().props('bsSize').length).toBe(1);
  });

});

