import { auth } from '../services/api';
import history from '../history';

const ID_TOKEN_KEY = 'id_token';
//const REDIRECT = '/callback';

/*var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});*/

export const login = (authParams) => {
  return auth(authParams).then(user => {
    if(user) {
      setIdToken(user)
      history.push(window.location.pathname);
    }
    return user;
  })
}

export const logout = () => {
  clearIdToken();
  history.push('/');
}

export const requireAuth = (nextState, replace) => {
  if (!isLoggedIn()) {
    replace({
      pathname: '/'
    });
  }
}

export const getIdToken = () => {
  return localStorage.getItem(ID_TOKEN_KEY);
}

const clearIdToken = () => {
  localStorage.removeItem(ID_TOKEN_KEY);
}

/*// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}*/

// Get and store id_token in local storage
export const setIdToken = (authParams) => {
  localStorage.setItem(ID_TOKEN_KEY, authParams);
}

export const isLoggedIn = () => {
  const idToken = getIdToken();
  return !!idToken;
}

/*const getTokenExpirationDate = (encodedToken) => {
  const token = md5(encodedToken);
  if (!token.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}*/

/*function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}*/