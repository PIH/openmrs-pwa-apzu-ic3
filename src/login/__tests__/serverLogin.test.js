jest.mock('@openmrs/react-components', () => ({
  axiosInstance: {
    get: jest.fn(),
    defaults: { baseURL: "/openmrs/ws/rest/v1", headers: { common: {} } },
    interceptors: { response: { use: jest.fn() } }
  }
}));
jest.mock('../../store', () => ({ history: { location: { pathname: '/' } } }));

import { axiosInstance } from '@openmrs/react-components';
import { history } from '../../store';
import { handleSessionExpiry, isWithinServer, pwaReturnPath, redirectToServerLogin, withRedirect } from '../serverLogin';

const PWA = '/openmrs/owa/ic3/index.html';

describe('server login', () => {

  beforeEach(() => {
    window.history.pushState({}, '', PWA);
    history.location.pathname = '/';
    window.location.replace = jest.fn();
    axiosInstance.get.mockReset();
  });

  it('should add the return path as an encoded redirect parameter', () => {
    expect(withRedirect("/openmrs/login.page", PWA)).toEqual("/openmrs/login.page?redirect=%2Fopenmrs%2Fowa%2Fic3%2Findex.html");
    expect(withRedirect("/openmrs/login.page?a=1", "/x")).toEqual("/openmrs/login.page?a=1&redirect=%2Fx");
  });

  it('should return to the screen the user was on, but not to login or logout', () => {
    expect(pwaReturnPath({ pathname: PWA, hash: "#/workflow/screening/nurse" }, "/screening/nurse"))
      .toEqual(PWA + "#/workflow/screening/nurse");
    expect(pwaReturnPath({ pathname: PWA, hash: "" }, "/")).toEqual(PWA);
    expect(pwaReturnPath({ pathname: PWA, hash: "#/logout" }, "/logout")).toEqual(PWA);
    expect(pwaReturnPath({ pathname: PWA, hash: "#/login" }, "/login")).toEqual(PWA);
  });

  it('should not return to login when the hash carries the router basename', () => {
    expect(pwaReturnPath({ pathname: PWA, hash: "#/workflow/login" }, "/login")).toEqual(PWA);
    expect(pwaReturnPath({ pathname: PWA, hash: "#/workflow/logout" }, "/logout")).toEqual(PWA);
  });

  it('should redirect to a login page it is given, without another request', () => {
    return redirectToServerLogin("/openmrs/authenticationui/login/login.page").then(redirected => {
      expect(redirected).toBe(true);
      expect(axiosInstance.get).not.toHaveBeenCalled();
      expect(window.location.replace).toHaveBeenCalledWith(withRedirect("/openmrs/authenticationui/login/login.page", PWA));
    });
  });

  it('should otherwise redirect to the login page the session endpoint gives', () => {
    axiosInstance.get.mockReturnValue(Promise.resolve({ data: { authenticated: false }, headers: { location: "/openmrs/login.page" } }));
    return redirectToServerLogin().then(redirected => {
      expect(redirected).toBe(true);
      expect(axiosInstance.get).toHaveBeenCalledWith("session");
      expect(window.location.replace).toHaveBeenCalledWith(withRedirect("/openmrs/login.page", PWA));
    });
  });

  it('should use the login page given with a 401, or the server root if none is given', () => {
    axiosInstance.get.mockReturnValue(Promise.reject({ response: { status: 401, headers: {} } }));
    return redirectToServerLogin().then(() => {
      expect(window.location.replace).toHaveBeenCalledWith(withRedirect("/openmrs/", PWA));
    });
  });

  it('should not redirect if the user is logged in after all', () => {
    axiosInstance.get.mockReturnValue(Promise.resolve({ data: { authenticated: true }, headers: {} }));
    return redirectToServerLogin().then(redirected => {
      expect(redirected).toBe(false);
      expect(window.location.replace).not.toHaveBeenCalled();
    });
  });

  it('should fail rather than redirect if the server does not answer', () => {
    axiosInstance.get.mockReturnValue(Promise.reject(new Error('Network Error')));
    return redirectToServerLogin().then(() => { throw new Error('should have failed'); }, error => {
      expect(error.message).toEqual('Network Error');
      expect(window.location.replace).not.toHaveBeenCalled();
    });
  });

  it('should not ask to return to a PWA served outside the server, which the login page cannot do', () => {
    window.history.pushState({}, '', '/workflow/index.html');
    expect(isWithinServer('/workflow/index.html')).toBe(false);
    expect(isWithinServer(PWA)).toBe(true);
    return redirectToServerLogin("/openmrs/authenticationui/login/login.page").then(() => {
      expect(window.location.replace).toHaveBeenCalledWith("/openmrs/authenticationui/login/login.page");
    });
  });

  it('should go to the login page when a request finds the session has ended', () => {
    handleSessionExpiry();
    handleSessionExpiry();
    expect(axiosInstance.interceptors.response.use).toHaveBeenCalledTimes(1);
    const onError = axiosInstance.interceptors.response.use.mock.calls[0][1];
    const error = { response: { status: 401, headers: { location: "/openmrs/authenticationui/login/login.page" } } };
    return onError(error).then(() => { throw new Error('should still fail'); }, rejected => {
      expect(rejected).toBe(error);
      expect(window.location.replace).toHaveBeenCalledWith(withRedirect("/openmrs/authenticationui/login/login.page", PWA));
    });
  });
});
