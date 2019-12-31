import auth0 from 'auth0-js';
import { navigate } from 'gatsby';
import getUser from '../components/common/get-faunadb-user.js';
import handleCustomer from '../components/common/handle-customer.js';

const isBrowser = typeof window !== 'undefined';
console.log(process.env.GATSBY_AUTH0_CALLBACK)
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
  console.log("set session")
  if (err) {
    console.log("Err: " + err)
    navigate('/');
    cb();
    return;
  }
  console.log("Auth result: " + authResult)
  if (authResult === null) {
    console.log("Could not set session")
    navigate('/')
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    console.log("If statement")

    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    console.log("expiresAt: " + expiresAt)
    tokens.accessToken = authResult.accessToken;
    console.log("accessToken: " + tokens.accessToken)
    tokens.idToken = authResult.idToken;
    console.log("idToken: " + tokens.idToken)

    tokens.expiresAt = expiresAt;
    console.log("expiresAt: " + tokens.expiresAt)

    user = authResult.idTokenPayload;
    console.log("user: " + tokens.user)

    localStorage.setItem('isLoggedIn', true);
    console.log("Set item")
    handleCustomer();
    console.log("handleCustomer")
    navigate('/');
    cb();
  }
};

export const silentAuth = callback => {
  if (!isAuthenticated()) return callback();
  auth.checkSession({}, setSession(callback));
};

export const handleAuthentication = () => {
  if (!isBrowser) {
    return;
  }
  console.log("ParseHash")
  auth.parseHash(setSession());
};

export const getProfile = () => {
  return user;
};

export const logout = () => {
  localStorage.setItem('isLoggedIn', false);
  localStorage.removeItem('customer_subscriptions');
  auth.logout();
};
