import * as ActionTypes from '../constants/Header';

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

        default:
            return state;
    }
}
