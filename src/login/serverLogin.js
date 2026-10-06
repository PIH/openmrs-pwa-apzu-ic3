import { axiosInstance } from '@openmrs/react-components';

// Login and logout are handled by the OpenMRS server's login page, which supports session locations and
// multi-factor authentication.  The PWA sends the user there, and the login page sends them back afterwards.

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS || "";
const contextPath = (process.env.REACT_APP_SERVER_CONTEXT_PATH || "/openmrs").replace(/\/$/, "");

// A path, not a full URL: the authentication module treats redirects as relative to the context path
export const withRedirectToPwa = (loginPage, pwaPath) =>
  loginPage + (loginPage.indexOf("?") >= 0 ? "&" : "?") + "redirect=" + encodeURIComponent(pwaPath);

// The authentication module answers the session endpoint, when not logged in, with its login page in Location
const fetchLoginPage = () =>
  axiosInstance.get("session")
    .then(response => response.headers.location)
    .catch(error => error.response && error.response.headers.location);

export const redirectToServerLogin = () =>
  fetchLoginPage().then(loginPage => {
    const page = loginPage ? serverAddress + loginPage : serverAddress + contextPath + "/";
    window.location.replace(withRedirectToPwa(page, window.location.pathname));
  });
