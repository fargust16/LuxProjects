import * as ActionTypes from '../constants/Header';

export const changeDisplayMenu = (menuIsShow) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_DISPLAY_MENU,
    payload: menuIsShow
});

export const changeDisplayAuth = (authIsShow) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_DISPLAY_AUTH,
    payload: authIsShow
});