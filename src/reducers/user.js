import * as ActionTypes from '../constants/User';
import {userData} from '../services/AuthService';

const initData = userData();

const initialState = {
    username: initData || {},
    error: ''
};

export default function user(state = initialState, action) {

    switch (action.type) {

        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                username: action.payload,
                error: ''
            };

        case ActionTypes.LOGIN_FAIL:
            return {
                ...state,
                error: action.payload
            };

        case ActionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                username: action.payload,
                error: ''
            };

        case ActionTypes.SIGNUP_FAIL:
            return {
                ...state,
                error: action.payload
            };

        case ActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                username: {},
                error: ''
            };

        case ActionTypes.LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload
            };

        case ActionTypes.USER_EMAIL_CHANGE_SUCCESS:
            return {...state, username: action.payload, error: ''};

        case ActionTypes.USER_EMAIL_CHANGE_FAIL:
            return {...state, error: action.payload};

        case ActionTypes.USER_PASSWORD_CHANGE_SUCCESS:
            return {...state, username: action.payload, error: ''};

        case ActionTypes.USER_PASSWORD_CHANGE_FAIL:
            return {...state, error: action.payload};

        default:
            return state;
    }
}
