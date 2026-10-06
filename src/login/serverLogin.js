import { axiosInstance } from '@openmrs/react-components';

// Login and logout are handled by the OpenMRS server's login page, which supports session locations and
// multi-factor authentication.  The PWA sends the user there, and the login page sends them back afterwards.

// The server's context path, eg. /openmrs/, from the REST base url that react-components is configured with
const serverRoot = () => axiosInstance.defaults.baseURL.replace(/ws\/rest\/v1\/?$/, "");

// Where to return after login: the PWA, and the screen the user was on unless it was login or logout.  A path,
// not a full URL, as the authentication module treats redirects as relative to the context path
export const pwaReturnPath = (location) => {
  const route = /^#\/(login|logout)\b/.test(location.hash) ? "" : location.hash;
  return location.pathname + route;
};

export const withRedirect = (loginPage, returnPath) =>
  loginPage + (loginPage.indexOf("?") >= 0 ? "&" : "?") + "redirect=" + encodeURIComponent(returnPath);

// The authentication module answers the session endpoint, when not logged in, with its login page in Location
const fetchLoginPage = () =>
  axiosInstance.get("session")
    .then(response => response.headers.location)
    .catch(error => error.response && error.response.headers.location);

export const redirectToServerLogin = (loginPage) =>
  Promise.resolve(loginPage || fetchLoginPage()).then(page => {
    window.location.replace(withRedirect(page || serverRoot(), pwaReturnPath(window.location)));
  });
