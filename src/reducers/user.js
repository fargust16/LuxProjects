import {LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, SIGNUP_SUCCESS, SIGNUP_FAIL} from '../constants/User';
import {userData} from '../services/AuthService';

let initData = userData();

//console.log(initData);

const initialState = {
    username: initData || '',
    error: ''
};

export default function user(state = initialState, action) {

    switch (action.type) {

        case LOGIN_SUCCESS:
            return {
                ...state,
                username: action.payload,
                error: ''
            };

        case LOGIN_FAIL:
            return {
                ...state,
                error: action.payload
            };

        case SIGNUP_SUCCESS:
            return {
                ...state,
                username: action.payload,
                error: ''
            };

        case SIGNUP_FAIL:
            return {
                ...state,
                error: action.payload
            };

        case LOGOUT_SUCCESS:
            return {
                ...state,
                username: {},
                error: ''
            };

        case LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
}
