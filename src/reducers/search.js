import * as ActionTypes from '../constants/Search';
import {CHANGE_DISPLAY_MENU} from "../constants/Header";

const initialState = {
    searchInput: '',
    searchType: 'all',
    searchResults: [],
    error: ''
};

export default function search(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CHANGE_SEARCH_INPUT_TEXT:
            return {...state, searchInput: action.payload, error: ''};

        case ActionTypes.CHANGE_SEARCH_TYPE:
            return {...state, searchType: action.payload, error: ''};

        case ActionTypes.GET_SEARCH_RESULT_SUCCESS:
            return {...state, searchResults: action.payload, error: ''};

        case ActionTypes.GET_SEARCH_RESULT_FAIL:
            return {...state, error: action.payload};

        case CHANGE_DISPLAY_MENU:
            return {...state, searchInput: ''};

        default:
            return state
    }
}