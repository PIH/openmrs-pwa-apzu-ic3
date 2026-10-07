jest.mock('@openmrs/react-components', () => ({
  axiosInstance: { defaults: { headers: { common: {} } } },
  LoadingView: () => null,
  loginActions: {
    loginSucceeded: () => ({ type: 'LOGIN_SUCCEEDED' }),
    logoutSucceeded: () => ({ type: 'LOGOUT_SUCCEEDED' })
  },
  sessionActions: {
    fetchSessionSucceeded: (session) => ({ type: 'FETCH_SUCCEEDED', session }),
    setSessionSucceeded: (session) => ({ type: 'SET_SUCCEEDED', session })
  },
  sessionRest: { fetchCurrentSession: jest.fn() }
}));
jest.mock('../serverLogin', () => ({ redirectToServerLogin: jest.fn(), handleSessionExpiry: jest.fn() }));

import React from 'react';
import { shallow } from 'enzyme';
import { sessionRest } from '@openmrs/react-components';
import { handleSessionExpiry, redirectToServerLogin } from '../serverLogin';
import { SessionGate } from '../SessionGate';
import ServerUnavailable from '../ServerUnavailable';

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

const sessionFor = (user, location) => ({ authenticated: true, user: { uuid: user }, sessionLocation: { uuid: location } });

describe('session gate', () => {

  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
    redirectToServerLogin.mockReset();
    redirectToServerLogin.mockReturnValue(Promise.resolve(true));
  });

  const renderWith = (serverSession, persistedSession) => {
    sessionRest.fetchCurrentSession.mockReturnValue(serverSession);
    return shallow(<SessionGate dispatch={dispatch} session={persistedSession}><div className="app"/></SessionGate>);
  };

  it('should start the app as a login does, for a new session', () => {
    const gate = renderWith(Promise.resolve(sessionFor('user1', 'loc1')), {});
    return flushPromises().then(() => {
      expect(handleSessionExpiry).toHaveBeenCalled();
      expect(dispatch.mock.calls.map(c => c[0].type)).toEqual(['FETCH_SUCCEEDED', 'LOGIN_SUCCEEDED']);
      expect(gate.update().find('.app').length).toBe(1);
      expect(redirectToServerLogin).not.toHaveBeenCalled();
    });
  });

  it('should carry on where the user was, without reloading, for the same user and location', () => {
    renderWith(Promise.resolve(sessionFor('user1', 'loc1')), sessionFor('user1', 'loc1'));
    return flushPromises().then(() => {
      expect(dispatch.mock.calls.map(c => c[0].type)).toEqual(['FETCH_SUCCEEDED']);
    });
  });

  it('should change location as the app does, for the same user at another location', () => {
    renderWith(Promise.resolve(sessionFor('user1', 'loc2')), sessionFor('user1', 'loc1'));
    return flushPromises().then(() => {
      expect(dispatch.mock.calls.map(c => c[0].type)).toEqual(['SET_SUCCEEDED']);
    });
  });

  it('should clear the previous user\'s state before starting, for a different user', () => {
    renderWith(Promise.resolve(sessionFor('user2', 'loc1')), sessionFor('user1', 'loc1'));
    return flushPromises().then(() => {
      expect(dispatch.mock.calls.map(c => c[0].type)).toEqual(['LOGOUT_SUCCEEDED', 'FETCH_SUCCEEDED', 'LOGIN_SUCCEEDED']);
    });
  });

  it('should go to the login page the server gives with a 401', () => {
    renderWith(Promise.reject({ response: { status: 401, headers: { location: '/openmrs/authenticationui/login/login.page' } } }), {});
    return flushPromises().then(() => {
      expect(redirectToServerLogin).toHaveBeenCalledWith('/openmrs/authenticationui/login/login.page');
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  it('should not send the user away if the server cannot be reached', () => {
    const gate = renderWith(Promise.reject(new Error('Network Error')), {});
    return flushPromises().then(() => {
      gate.update();
      expect(redirectToServerLogin).not.toHaveBeenCalled();
      expect(gate.find('.app').length).toBe(0);
      expect(gate.find(ServerUnavailable).length).toBe(1);
    });
  });
});
