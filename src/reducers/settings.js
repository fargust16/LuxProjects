import * as ActionTypes from '../constants/Settings';
import {USER_EMAIL_CHANGE_SUCCESS, USER_EMAIL_CHANGE_FAIL, USER_PASSWORD_CHANGE_REQUEST, USER_PASSWORD_CHANGE_SUCCESS, USER_PASSWORD_CHANGE_FAIL} from '../constants/User';
import {StrongPassGenerator} from "../containers/AuthForm";
import sha512 from "js-sha512";

const initialState = {
    emailTipsIsShow: false,
    pswdTipsIsShow: false,
    newEmail: '',
    pswdOnEmail: '',
    pswdOnPswd: '',
    newPswd: '',
    rePswd: '',
    errorValid: '',
    confirmMessage: '',
    changeIsSuccess: false
};

export default function settings(state = initialState, action) {

    switch (action.type) {

        case ActionTypes.CHANGE_NEW_EMAIL:
            return {...state, newEmail: action.payload, emailTipsIsShow: false};

        case ActionTypes.CHNAGE_EMAIL_PASSWORD:
            return {...state, pswdOnEmail: action.payload, emailTipsIsShow: false};

        case ActionTypes.CHNAGE_PSWD_PASSWORD:
            return {...state, pswdOnPswd: action.payload, pswdTipsIsShow: false};

        case ActionTypes.CHNAGE_NEW_PASSWORD:
            return {...state, newPswd: action.payload, pswdTipsIsShow: false, errorValid: ''};

        case ActionTypes.CHNAGE_RE_NEW_PASSWORD:
            return {...state, rePswd: action.payload, pswdTipsIsShow: false, errorValid: ''};

        case ActionTypes.CANCEL_CHANGE_EMAIL:
            return {...state, pswdOnEmail: '', newEmail: '', emailTipsIsShow: false};

        case ActionTypes.CANCEL_CHANGE_PASSWORD:
            return {...state, pswdOnPswd: '', newPswd: '', rePswd: '', pswdTipsIsShow: false};

        case ActionTypes.SUBMIT_CHANGES:
            return {...state, changeIsSuccess: false, confirmMessage: ''};

        case ActionTypes.VALID_PASSWORDS_FAIL: {
            return {...state, errorValid: 'Passwords does not match', pswdTipsIsShow: true};
        }

        case USER_EMAIL_CHANGE_SUCCESS:
            return {
                ...state,
                changeIsSuccess: true,
                confirmMessage: 'Email was changed',
                pswdOnEmail: '',
                newEmail: '',
                emailTipsIsShow: false
            };

        case USER_PASSWORD_CHANGE_SUCCESS:
            return {
                ...state,
                changeIsSuccess: true,
                confirmMessage: 'Password was changed',
                pswdOnPswd: '',
                newPswd: '',
                rePswd: '',
                pswdTipsIsShow: false
            };

        case USER_EMAIL_CHANGE_FAIL:
            return {...state, emailTipsIsShow: true};

        case USER_PASSWORD_CHANGE_FAIL:
            return {...state, pswdTipsIsShow: true};

        default:
            return state;
    }
}
