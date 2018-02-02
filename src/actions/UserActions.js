import * as ActionTypes from '../constants/User';
import {loadStart, loadEnd} from './LoadActions';

import {login, logout, isLoggedIn, setIdToken} from '../services/AuthService';
import {signUp, updateUserData} from '../services/api';

export const handleLogIn = (authData) => {

    return (dispatch) => {

        loadStart(dispatch);

        login(authData)
            .then(data => {
                if (data) {
                    dispatch({
                        type: ActionTypes.LOGIN_SUCCESS,
                        payload: data
                    })
                } else {
                    let err = 'The password or email address did not match';
                    dispatch({
                        type: ActionTypes.LOGIN_FAIL,
                        payload: err
                    })
                }
                loadEnd(dispatch);
            })
            .catch(err => {
                dispatch({
                    type: ActionTypes.LOGIN_FAIL,
                    payload: err
                });
                loadEnd(dispatch);
            });
    }
};

export const handleSignUp = (authData) => {
    return (dispatch) => {

        loadStart(dispatch);

        signUp(authData)
            .then(data => {
                if (!data.detail) {
                    dispatch({
                        type: ActionTypes.SIGNUP_SUCCESS,
                        payload: data
                    })
                } else {
                    let err = 'User with this email already exist';
                    //let err = data.detail;
                    dispatch({
                        type: ActionTypes.SIGNUP_FAIL,
                        payload: err
                    })
                }
                loadEnd(dispatch);
            })
            .catch(err => {
                dispatch({
                    type: ActionTypes.SIGNUP_FAIL,
                    payload: err
                });

                loadEnd(dispatch);
            });
    }
};

export const handleLogOut = () => {

    return (dispatch) => {

        logout(dispatch);

        if (!isLoggedIn()) {
            dispatch({
                type: ActionTypes.LOGOUT_SUCCESS
            })
        } else {
            let err = 'Somethings wrong';
            dispatch({
                type: ActionTypes.LOGOUT_FAIL,
                payload: err
            })
        }

        loadEnd(dispatch);
    }
};

export const handleEmailChange = (userData) => (dispatch) => {
    loadStart(dispatch);



    updateUserData(userData)
        .then(data => {
            if (!data.received) {
                dispatch({
                    type: ActionTypes.USER_EMAIL_CHANGE_SUCCESS,
                    payload: data
                });
                setIdToken(data);
            }
            else {
                let err = `The ${data.received} did not changed. Some data is incorrect.`;
                dispatch({
                    type: ActionTypes.USER_EMAIL_CHANGE_FAIL,
                    payload: err,
                    optionType: data.received
                })
            }
            loadEnd(dispatch);
        })
        .catch(err => {
            dispatch({
                type: ActionTypes.USER_EMAIL_CHANGE_FAIL,
                payload: err
            });
            loadEnd(dispatch);
        });
};

export const handlePasswordChange = (userData) => (dispatch) => {

    loadStart(dispatch);

    updateUserData(userData)
        .then(data => {
            if (!data.received) {
                dispatch({
                    type: ActionTypes.USER_PASSWORD_CHANGE_SUCCESS,
                    payload: data
                });
                setIdToken(data);
            }
            else {
                let err = `The ${data.received} did not changed. Some data is incorrect.`;
                dispatch({
                    type: ActionTypes.USER_PASSWORD_CHANGE_FAIL,
                    payload: err,
                    optionType: data.received
                })
            }
            loadEnd(dispatch);
        })
        .catch(err => {
            dispatch({
                type: ActionTypes.USER_PASSWORD_CHANGE_FAIL,
                payload: err
            });
            loadEnd(dispatch);
        });
};