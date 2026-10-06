jest.mock('@openmrs/react-components', () => ({
  axiosInstance: { defaults: { headers: { common: {} } } },
  LoadingView: () => null,
  loginActions: { loginSucceeded: () => ({ type: 'LOGIN_SUCCEEDED' }) },
  sessionActions: { fetchSessionSucceeded: (session) => ({ type: 'FETCH_SUCCEEDED', session }) },
  sessionRest: { fetchCurrentSession: jest.fn() }
}));
jest.mock('../serverLogin', () => ({ redirectToServerLogin: jest.fn() }));

import React from 'react';
import { shallow } from 'enzyme';
import { sessionRest } from '@openmrs/react-components';
import { redirectToServerLogin } from '../serverLogin';
import { SessionGate } from '../SessionGate';

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe('session gate', () => {

  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
    redirectToServerLogin.mockReset();
  });

  it('should store the session and start the app as a login does, if authenticated', () => {
    const session = { authenticated: true, sessionLocation: { uuid: 'loc' } };
    sessionRest.fetchCurrentSession.mockReturnValue(Promise.resolve(session));
    const gate = shallow(<SessionGate dispatch={dispatch}><div className="app"/></SessionGate>);
    return flushPromises().then(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: 'FETCH_SUCCEEDED', session });
      expect(dispatch).toHaveBeenCalledWith({ type: 'LOGIN_SUCCEEDED' });
      gate.update();
      expect(gate.find('.app').length).toBe(1);
      expect(redirectToServerLogin).not.toHaveBeenCalled();
    });
  });

  it('should go to the login page the server gives with a 401', () => {
    sessionRest.fetchCurrentSession.mockReturnValue(Promise.reject(
      { response: { status: 401, headers: { location: '/openmrs/authenticationui/login/login.page' } } }));
    shallow(<SessionGate dispatch={dispatch}><div className="app"/></SessionGate>);
    return flushPromises().then(() => {
      expect(redirectToServerLogin).toHaveBeenCalledWith('/openmrs/authenticationui/login/login.page');
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  it('should not send the user away if the server cannot be reached', () => {
    sessionRest.fetchCurrentSession.mockReturnValue(Promise.reject(new Error('Network Error')));
    const gate = shallow(<SessionGate dispatch={dispatch}><div className="app"/></SessionGate>);
    return flushPromises().then(() => {
      gate.update();
      expect(redirectToServerLogin).not.toHaveBeenCalled();
      expect(gate.find('.app').length).toBe(0);
      expect(gate.text()).toContain('could not be reached');
    });
  });
});
