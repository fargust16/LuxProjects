import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL } from '../constants/User';

import { login, logout, isLoggedIn } from '../services/AuthService';

export function handleLogIn(authData) {

  return (dispatch) => {

    dispatch({
      type: LOGIN_REQUEST
    })

    login(authData)
      .then(data => {
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
      .catch(err => {
        dispatch({
          type: LOGIN_FAIL,
          payload: err
        })
      });
  }
}

export function handleLogOut() {

  return (dispatch) => {

    dispatch({
      type: LOGOUT_REQUEST
    })

    logout();

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