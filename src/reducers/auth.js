import * as ActionTypes from '../constants/AuthForm';

const initialState = {
    signInIsShow: true,
    signUpIsShow: false,
    isTipsShow: false,
    isAuthCorrect: false,
    email: '',
    password: '',
    rePassword: '',
    errorValid: ''
};

export default function auth(state = initialState, action) {

    switch (action.type) {

        case ActionTypes.SHOW_SIGN_IN_FORM:
            return {...state, signInIsShow: action.payload, signUpIsShow: false, email: '', password: '' };

        case ActionTypes.SHOW_SIGN_UP_FORM:
            return {...state, signUpIsShow: action.payload, signInIsShow: false, email: '', password: '' };

        case ActionTypes.CHANGE_EMAIL:
            return {...state, email: action.payload, isTipsShow: false };

        case ActionTypes.CHANGE_PASSWORD:
            return {...state, password: action.payload, isTipsShow: false };

        case ActionTypes.CHANGE_RE_PASSWORD:
            return {...state, rePassword: action.payload, isTipsShow: false };

        case ActionTypes.VALID_AUTH_PASSWORDS_FAIL:
            return {...state, errorValid: 'Passwords does not match', isTipsShow: true };

        default:
            return state;
    }
}
