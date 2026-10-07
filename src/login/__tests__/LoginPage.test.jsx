jest.mock('@openmrs/react-components', () => ({ LoadingView: () => null }));
jest.mock('../serverLogin', () => ({ redirectToServerLogin: jest.fn() }));

import React from 'react';
import { shallow } from 'enzyme';
import { redirectToServerLogin } from '../serverLogin';
import { LoginPage } from '../LoginPage';
import ServerUnavailable from '../ServerUnavailable';

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe('login page', () => {

  let history;

  beforeEach(() => {
    history = { replace: jest.fn() };
    redirectToServerLogin.mockReset();
  });

  it('should send the user to the server login page', () => {
    redirectToServerLogin.mockReturnValue(Promise.resolve(true));
    const page = shallow(<LoginPage history={history}/>);
    return flushPromises().then(() => {
      expect(redirectToServerLogin).toHaveBeenCalled();
      expect(history.replace).not.toHaveBeenCalled();
      expect(page.update().find(ServerUnavailable).length).toBe(0);
    });
  });

  it('should go back into the app if the user is logged in after all', () => {
    redirectToServerLogin.mockReturnValue(Promise.resolve(false));
    shallow(<LoginPage history={history}/>);
    return flushPromises().then(() => {
      expect(history.replace).toHaveBeenCalledWith('/');
    });
  });

  it('should offer to try again, rather than leave the app, if the server cannot be reached', () => {
    redirectToServerLogin.mockReturnValue(Promise.reject(new Error('Network Error')));
    const page = shallow(<LoginPage history={history}/>);
    return flushPromises().then(() => {
      expect(history.replace).not.toHaveBeenCalled();
      expect(page.update().find(ServerUnavailable).length).toBe(1);
    });
  });
});
