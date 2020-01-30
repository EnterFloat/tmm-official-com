import auth0 from 'auth0-js';
import { navigate } from 'gatsby';
import handleCustomer from '../components/common/handle-customer.js';

const isBrowser = typeof window !== 'undefined';
var isAuth0Callback = 'false';
const auth = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.GATSBY_AUTH0_DOMAIN,
      clientID: process.env.GATSBY_AUTH0_CLIENTID,
      redirectUri: process.env.GATSBY_AUTH0_CALLBACK,
      responseType: 'token id_token',
      scope: 'openid profile email',
    })
  : {};

const tokens = {
  accessToken: false,
  idToken: false,
  expiresAt: false,
};

let user = {};

export const isAuthenticated = () => {
  if (!isBrowser) {
    return;
  }
  return localStorage.getItem('isLoggedIn') === 'true';
};

export const login = () => {
  if (!isBrowser) {
    return;
  }

  auth.authorize();
};

const setSession = (cb = () => {}) => (err, authResult) => {
  if (err) {
    navigate('/');
    cb();
    return;
  }
  if (authResult === null) {
    navigate('/');
  }

  if (authResult && authResult.accessToken && authResult.idToken) {

    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    tokens.accessToken = authResult.accessToken;
    tokens.idToken = authResult.idToken;
    tokens.expiresAt = expiresAt;
    user = authResult.idTokenPayload;
    localStorage.setItem('isLoggedIn', true);
    handleCustomer().then(result => {
      console.log("Auth " + result)
    })
    .catch(err => {
      console.log("Auth " + err)
    });
    if (isAuth0Callback === 'true') {
      navigate('/');
    }
    isAuth0Callback = 'false';

    cb();
  }
};

export const silentAuth = callback => {
  if (!isAuthenticated()) return callback();
  auth.checkSession({}, setSession(callback));
};

export const handleAuthentication = isAuth0_callback => {
  isAuth0Callback = isAuth0_callback;
  if (!isBrowser) {
    return;
  }
  auth.parseHash(setSession());
};

export const getProfile = () => {
  return user;
};

export const logout = () => {
  isAuth0Callback = 'true';
  localStorage.setItem('isLoggedIn', false);
  localStorage.removeItem('customer_subscriptions');
  localStorage.setItem('ownsTMS', false);
  localStorage.removeItem('customer');
  auth.logout();
};
