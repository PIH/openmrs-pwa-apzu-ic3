import { axiosInstance } from '@openmrs/react-components';
import { history } from '../store';

// Login and logout are handled by the OpenMRS server's login page, which supports session locations and
// multi-factor authentication.  The PWA sends the user there, and the login page sends them back afterwards.

// The server's context path, eg. /openmrs/, from the REST base url that react-components is configured with
const serverRoot = () => axiosInstance.defaults.baseURL.replace(/ws\/rest\/v1\/?$/, "");

// Where to return after login: the PWA, and the screen the user was on unless it was login or logout.  The route
// is checked as the router sees it, as the hash also carries the router's basename (eg. #/workflow/login).  A path,
// not a full URL, as the authentication module treats redirects as relative to the context path
export const pwaReturnPath = (location, route = history.location.pathname) =>
  location.pathname + (/^\/(login|logout)\b/.test(route) ? "" : location.hash);

export const withRedirect = (loginPage, returnPath) =>
  loginPage + (loginPage.indexOf("?") >= 0 ? "&" : "?") + "redirect=" + encodeURIComponent(returnPath);

// The authentication module answers the session endpoint, when not logged in, with its login page in Location.
// Resolves to null if the user is logged in after all, and rejects if the server didn't answer (eg. offline).
const fetchLoginPage = () =>
  axiosInstance.get("session")
    .then(response => response.data && response.data.authenticated === true ? null : response.headers.location || serverRoot())
    .catch(error => {
      if (error.response && error.response.status === 401) {
        return error.response.headers.location || serverRoot();
      }
      throw error;
    });

// The authentication module can only return the user to a page within OpenMRS.  Served outside it (eg. by Tomcat
// at /workflow on legacy servers), the PWA can't ask to be returned to, so the user lands on the EMR home page.
export const isWithinServer = (path) =>
  path.indexOf(new URL(serverRoot(), window.location.origin).pathname) === 0;

// If the server session ends while the app is open (a timeout, a restart, or logging out of the EMR in another tab),
// requests are answered with a 401 giving the login page, so go there rather than leave the app failing quietly
let sessionExpiryHandlerInstalled = false;
export const handleSessionExpiry = () => {
  if (!sessionExpiryHandlerInstalled) {
    sessionExpiryHandlerInstalled = true;
    axiosInstance.interceptors.response.use(undefined, error => {
      if (error.response && error.response.status === 401) {
        redirectToServerLogin(error.response.headers.location).catch(() => {});
      }
      return Promise.reject(error);
    });
  }
};

// Resolves to true once sent to the login page, or false if the user is logged in, and rejects if the server didn't
// answer, so the caller can let the user try again rather than send them to a page that may not load
export const redirectToServerLogin = (loginPage) =>
  Promise.resolve(loginPage || fetchLoginPage()).then(page => {
    if (!page) {
      return false;
    }
    const returnPath = pwaReturnPath(window.location);
    window.location.replace(isWithinServer(returnPath) ? withRedirect(page, returnPath) : page);
    return true;
  });
