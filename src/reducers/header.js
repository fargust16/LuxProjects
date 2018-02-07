import * as ActionTypes from '../constants/Header';
import {LOGIN_SUCCESS} from "../constants/User";

const initialState = {
    menuIsOpen: false,
    authIsOpen: false
};

export default function load(state = initialState, action) {

    switch (action.type) {

        case ActionTypes.CHANGE_DISPLAY_MENU:
            return {...state, menuIsOpen: action.payload };

        case ActionTypes.CHANGE_DISPLAY_AUTH:
            return {...state, authIsOpen: action.payload };

        case LOGIN_SUCCESS:
            return {...state, authIsOpen: false };

        default:
            return state;
    }
}
