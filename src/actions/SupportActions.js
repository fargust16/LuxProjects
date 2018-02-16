import * as ActionTypes from '../constants/Support';
import {loadStart, loadEnd} from "./LoadActions";
import * as api from '../services/api';

export const changeSubjectText = (data) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_SUBJECT_TEXT,
    payload: data
});

export const changeMessageText = (data) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_MESSAGE_TEXT,
    payload: data
});

export const resetInputData = () => (dispatch) => dispatch({
    type: ActionTypes.RESET_INPUT_DATA
});

export const mailToSupport = (mailData) => (dispatch) => {
    loadStart(dispatch);

    api.mailToSupport(mailData)
        .then(data => {
            dispatch({
                type: ActionTypes.MAIL_TO_SUPPORT_SUCCESS,
                payload: data
            });
            loadEnd(dispatch);
        })
        .catch(error => {
            dispatch({
                type: ActionTypes.MAIL_TO_SUPPORT_FAIL,
                payload: error
            });
            loadEnd(dispatch);
        })
};