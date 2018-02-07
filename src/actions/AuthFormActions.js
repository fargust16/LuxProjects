import * as ActionTypes from '../constants/AuthForm';

export const changeSignInFormView = (formIsShow) => (dispatch) => dispatch({
    type: ActionTypes.SHOW_SIGN_IN_FORM,
    payload: formIsShow
});

export const changeSignUpFormView = (formIsShow) => (dispatch) => dispatch({
    type: ActionTypes.SHOW_SIGN_UP_FORM,
    payload: formIsShow
});

export const changeEmail = (value) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_EMAIL,
    payload: value
});

export const changePassword = (value) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_PASSWORD,
    payload: value
});

export const changeRePassword = (value) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_RE_PASSWORD,
    payload: value
});

export const validPasswordsFail = () => (dispatch) => dispatch({
    type: ActionTypes.VALID_AUTH_PASSWORDS_FAIL,
});