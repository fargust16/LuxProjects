import * as ActionTypes from '../constants/Settings';

export const changeNewEmail = (newEmail) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_NEW_EMAIL,
    payload: newEmail
});
export const changeEmailPassword = (emailPassword) => (dispatch) => dispatch({
    type: ActionTypes.CHNAGE_EMAIL_PASSWORD,
    payload: emailPassword
});
export const cancelChangeEmail = () => (dispatch) => dispatch({type: ActionTypes.CANCEL_CHANGE_EMAIL});
export const changePswdPassword = (pswdPassword) => (dispatch) => dispatch({
    type: ActionTypes.CHNAGE_PSWD_PASSWORD,
    payload: pswdPassword
});
export const changeNewPassword = (newPassword) => (dispatch) => dispatch({
    type: ActionTypes.CHNAGE_NEW_PASSWORD,
    payload: newPassword
});
export const changeReNewPassword = (reNewPassword) => (dispatch) => dispatch({
    type: ActionTypes.CHNAGE_RE_NEW_PASSWORD,
    payload: reNewPassword
});
export const cancelChangePassword = () => (dispatch) => dispatch({type: ActionTypes.CANCEL_CHANGE_PASSWORD});
export const submitChanges = () => (dispatch) => dispatch({type: ActionTypes.SUBMIT_CHANGES});
export const validPasswordsFail = () => (dispatch) => dispatch({type: ActionTypes.VALID_PASSWORDS_FAIL});