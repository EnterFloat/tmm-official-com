import auth0 from 'auth0-js';
import { navigate } from 'gatsby';
import getUser from '../components/common/get-faunadb-user.js';
import handleCustomer from '../components/common/handle-customer.js';

const isBrowser = typeof window !== 'undefined';
var isAuth0Callback = "false"
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
    console.log("Navigated to /")
    cb();
    return;
  }
  console.log("Auth result: " + authResult)
  if (authResult === null) {
    console.log("Could not set session")
    navigate('/')
    console.log("Navigated to /")
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
    console.log("isAuth0Callback " + isAuth0Callback)
    if (isAuth0Callback == "true") {
      navigate('/');
    }
    isAuth0Callback = "false"

    cb();
  }
};

export const silentAuth = callback => {
  if (!isAuthenticated()) return callback();
  auth.checkSession({}, setSession(callback));
};

export const handleAuthentication = (isAuth0_callback) => {
  console.log("\n\n\n\n\n")

  console.log(isAuth0_callback)
  isAuth0Callback = isAuth0_callback
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
  isAuth0Callback = "true"
  localStorage.setItem('isLoggedIn', false);
  localStorage.removeItem('customer_subscriptions');
  localStorage.setItem('ownsTMS', false);
  auth.logout();
};
