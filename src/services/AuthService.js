import { auth } from '../services/api';
import history from '../history';
import jwt from 'jwt-simple';

const ID_TOKEN_KEY = 'id_token';
const SECRET = 'secretPhrase';
const myStorage = window.localStorage;

export const login = (authParams) => {
  return auth(authParams).then(user => {
    if (user) {
      setIdToken(user);
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
  let token = myStorage ? myStorage.getItem(ID_TOKEN_KEY) : '';
  return token && jwt.decode(token, SECRET);
}

const clearIdToken = () => {
  myStorage.removeItem(ID_TOKEN_KEY);
}

// Get and store id_token in local storage
export const setIdToken = (authParams) => {
  let tokenValue = jwt.encode(authParams, SECRET);
  myStorage.setItem(ID_TOKEN_KEY, tokenValue);
}

export const isLoggedIn = () => {
  const idToken = getIdToken();
  return !!idToken;
}

export const userData = () => {
  if (!isLoggedIn()) return;

  const idToken = getIdToken();
  return idToken;
}
