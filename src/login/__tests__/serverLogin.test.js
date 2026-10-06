jest.mock('@openmrs/react-components', () => ({ axiosInstance: { get: jest.fn() } }));

import { axiosInstance } from '@openmrs/react-components';
import { redirectToServerLogin, withRedirectToPwa } from '../serverLogin';

describe('server login', () => {

  beforeEach(() => {
    window.location.replace = jest.fn();
    axiosInstance.get.mockReset();
  });

  it('should add the PWA path as an encoded redirect parameter', () => {
    expect(withRedirectToPwa("/openmrs/login.page", "/openmrs/owa/app/index.html"))
      .toEqual("/openmrs/login.page?redirect=%2Fopenmrs%2Fowa%2Fapp%2Findex.html");
    expect(withRedirectToPwa("/openmrs/login.page?a=1", "/x"))
      .toEqual("/openmrs/login.page?a=1&redirect=%2Fx");
  });

  it('should redirect to the login page the session endpoint gives', () => {
    axiosInstance.get.mockReturnValue(Promise.resolve({ headers: { location: "/openmrs/authenticationui/login/login.page" } }));
    return redirectToServerLogin().then(() => {
      expect(axiosInstance.get).toHaveBeenCalledWith("session");
      expect(window.location.replace)
        .toHaveBeenCalledWith(withRedirectToPwa("/openmrs/authenticationui/login/login.page", window.location.pathname));
    });
  });

  it('should use the login page given with an unauthorized response', () => {
    axiosInstance.get.mockReturnValue(Promise.reject({ response: { headers: { location: "/openmrs/login.page" } } }));
    return redirectToServerLogin().then(() => {
      expect(window.location.replace).toHaveBeenCalledWith(withRedirectToPwa("/openmrs/login.page", window.location.pathname));
    });
  });

  it('should fall back to the server root if no login page is given', () => {
    axiosInstance.get.mockReturnValue(Promise.resolve({ headers: {} }));
    return redirectToServerLogin().then(() => {
      expect(window.location.replace).toHaveBeenCalledWith(withRedirectToPwa("/openmrs/", window.location.pathname));
    });
  });
});
