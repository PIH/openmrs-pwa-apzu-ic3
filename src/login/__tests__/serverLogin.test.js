jest.mock('@openmrs/react-components', () => ({
  axiosInstance: { get: jest.fn(), defaults: { baseURL: "/openmrs/ws/rest/v1", headers: { common: {} } } }
}));

import { axiosInstance } from '@openmrs/react-components';
import { isWithinServer, pwaReturnPath, redirectToServerLogin, withRedirect } from '../serverLogin';

describe('server login', () => {

  beforeEach(() => {
    window.history.pushState({}, '', '/openmrs/owa/app/index.html');
    window.location.replace = jest.fn();
    axiosInstance.get.mockReset();
  });

  it('should add the return path as an encoded redirect parameter', () => {
    expect(withRedirect("/openmrs/login.page", "/openmrs/owa/app/index.html"))
      .toEqual("/openmrs/login.page?redirect=%2Fopenmrs%2Fowa%2Fapp%2Findex.html");
    expect(withRedirect("/openmrs/login.page?a=1", "/x")).toEqual("/openmrs/login.page?a=1&redirect=%2Fx");
  });

  it('should return to the screen the user was on, but not to login or logout', () => {
    const path = "/openmrs/owa/app/index.html";
    expect(pwaReturnPath({ pathname: path, hash: "#/screening/nurse" })).toEqual(path + "#/screening/nurse");
    expect(pwaReturnPath({ pathname: path, hash: "" })).toEqual(path);
    expect(pwaReturnPath({ pathname: path, hash: "#/logout" })).toEqual(path);
    expect(pwaReturnPath({ pathname: path, hash: "#/login" })).toEqual(path);
  });

  it('should redirect to a login page it is given, without another request', () => {
    return redirectToServerLogin("/openmrs/authenticationui/login/login.page").then(() => {
      expect(axiosInstance.get).not.toHaveBeenCalled();
      expect(window.location.replace).toHaveBeenCalledWith(
        withRedirect("/openmrs/authenticationui/login/login.page", pwaReturnPath(window.location)));
    });
  });

  it('should otherwise redirect to the login page the session endpoint gives', () => {
    axiosInstance.get.mockReturnValue(Promise.resolve({ headers: { location: "/openmrs/login.page" } }));
    return redirectToServerLogin().then(() => {
      expect(axiosInstance.get).toHaveBeenCalledWith("session");
      expect(window.location.replace).toHaveBeenCalledWith(withRedirect("/openmrs/login.page", pwaReturnPath(window.location)));
    });
  });

  it('should fall back to the server root if no login page is given', () => {
    axiosInstance.get.mockReturnValue(Promise.resolve({ headers: {} }));
    return redirectToServerLogin().then(() => {
      expect(window.location.replace).toHaveBeenCalledWith(withRedirect("/openmrs/", pwaReturnPath(window.location)));
    });
  });

  it('should not ask to return to a PWA served outside the server, which the login page cannot do', () => {
    window.history.pushState({}, '', '/workflow/index.html');
    expect(isWithinServer('/workflow/index.html')).toBe(false);
    expect(isWithinServer('/openmrs/owa/app/index.html')).toBe(true);
    return redirectToServerLogin("/openmrs/authenticationui/login/login.page").then(() => {
      expect(window.location.replace).toHaveBeenCalledWith("/openmrs/authenticationui/login/login.page");
    });
  });
});
