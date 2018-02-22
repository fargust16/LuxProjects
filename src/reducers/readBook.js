import * as ActionTypes from '../constants/ReadBook';
import {GET_ALL_BOOKS_SUCCESS} from '../constants/Book';

const initialState = {
    currentPage: 0,
    endOfSwitch: 1,
    resizeEnd: 0,
    readOffset: 0,
    maxReadOffset: 0
};

export default function settings(state = initialState, action) {

    switch (action.type) {

        case ActionTypes.CHANGE_BOOK_PAGE:
            return {...state, currentPage: action.payload};

        case ActionTypes.CHANGE_BOOK_PAGE_SIZE:
            return {...state, resizeEnd: action.payload};

        case ActionTypes.CHANGE_END_OF_SWITCH:
            return {...state, endOfSwitch: action.payload};

        case ActionTypes.CHANGE_READ_OFFSET:
            return { ...state, readOffset: action.payload };

        case ActionTypes.CHANGE_MAX_READ_OFFSET:
            return {...state, maxReadOffset: action.payload};

        case GET_ALL_BOOKS_SUCCESS:
            return {...state, currentPage: 0, endOfSwitch: 0, resizeEnd: 0, readOffset: 0};

        default:
            return state;
    }
}
