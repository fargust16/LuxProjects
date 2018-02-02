import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    USER_DATA_UPDATE_SUCCESS,
    USER_DATA_UPDATE_FAIL
} from '../constants/User';
import {loadStart, loadEnd} from './LoadActions';

import {login, logout, isLoggedIn} from '../services/AuthService';
import {signUp, updateUserData} from '../services/api';

export const handleLogIn = (authData) => {

    return (dispatch) => {

        loadStart(dispatch);

        login(authData)
            .then(data => {
                if (data) {
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

        loadEnd(dispatch);
    }
};

export const handleSignUp = (authData) => {
    return (dispatch) => {

        loadStart(dispatch);

        signUp(authData)
            .then(data => {
                if (!data.detail) {
                    dispatch({
                        type: SIGNUP_SUCCESS,
                        payload: data
                    })
                } else {
                    let err = 'User with this email already exist';
                    //let err = data.detail;
                    dispatch({
                        type: SIGNUP_FAIL,
                        payload: err
                    })
                }
            })
            .catch(err => dispatch({
                type: SIGNUP_FAIL,
                payload: err
            }));

        loadEnd(dispatch);
    }
};

export const handleLogOut = () => {

    return (dispatch) => {

        logout(dispatch);

        if (!isLoggedIn()) {
            dispatch({
                type: LOGOUT_SUCCESS
            })
        } else {
            let err = 'Somethings wrong';
            dispatch({
                type: LOGOUT_FAIL,
                payload: err
            })
        }

        loadEnd(dispatch);
    }
};

export const handleUpdateUserData = (userData) => {
    return (dispatch) => {
        loadStart(dispatch);

        updateUserData(userData)
            .then(data => {
                if(!data.received) {
                    dispatch({
                        type: USER_DATA_UPDATE_SUCCESS,
                        payload: data
                    })
                }
                else{
                    let err = `The ${data.received} did not changed. Some data entergit incorrect.`;
                    dispatch({
                        type: USER_DATA_UPDATE_FAIL,
                        payload: err,
                        optionType: data.received
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: USER_DATA_UPDATE_FAIL,
                    payload: err
                })
            });

        loadEnd(dispatch);
    }
};