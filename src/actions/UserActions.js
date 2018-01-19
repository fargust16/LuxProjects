import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL } from '../constants/User';
import { loadStart, loadEnd } from './LoadActions';

import { login, logout, isLoggedIn } from '../services/AuthService';

export function handleLogIn(authData) {

  return (dispatch) => {

    loadStart(dispatch);

    login(authData)
      .then(data => {

        loadEnd(dispatch);

        if (data.id) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: data
          })
        } else {
          let err = 'The password or email address did not match';
          dispatch({
            type: LOGIN_FAIL,
            payload: err
          })
        }
      })
      .catch(err => dispatch({
        type: LOGIN_FAIL,
        payload: err
      }));
  }
}

export function handleLogOut() {

  return (dispatch) => {

    loadEnd(dispatch);

    logout(dispatch);

    if (!isLoggedIn()) {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: ''
      })
    } else {
      let err = 'Somethings wrong';
      dispatch({
        type: LOGOUT_FAIL,
        payload: err
      })
    }
  }
}