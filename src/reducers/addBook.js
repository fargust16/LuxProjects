import * as ActionTypes from '../constants/AddBook';
import {LOAD_START} from "../constants/Load";

const initialState = {
    allGenres: '',
    title: '',
    author: '',
    genre: '',
    isbn: '',
    release_date: '',
    description: '',
    text_file: '',
    cover: '',
    topics: [],
    error: ''
};

export default function addBook(state = initialState, action) {

    switch (action.type) {

        case ActionTypes.GET_LIST_OF_GENRES_SUCCESS:
            return { ...state, allGenres: action.payload, error: ''};

        case ActionTypes.GET_LIST_OF_GENRES_FAIL:
            return { ...state, error: action.payload};

        case ActionTypes.CHANGE_TITLE_TEXT:
            return { ...state, title: action.payload};

        case ActionTypes.CHANGE_AUTHOR_TEXT:
            return { ...state, author: action.payload};

        case ActionTypes.CHANGE_DESCRIPTION_TEXT:
            return { ...state, description: action.payload};

        case ActionTypes.CHANGE_BOOK_TEXT:
            return { ...state, text_file: action.payload};

        case ActionTypes.CHANGE_COVER_URL:
            return { ...state, cover: action.payload};

        case ActionTypes.CHANGE_RELEASE_DATE:
            return { ...state, release_date: action.payload};

        case ActionTypes.CHANGE_GENRE_TEXT:
            return { ...state, genre: action.payload};

        case ActionTypes.CHANGE_ISBN_TEXT:
            return { ...state, isbn: action.payload};

        case ActionTypes.CHANGE_TOPICS_ARRAY:
            return { ...state, topics: action.payload};

        case ActionTypes.ADD_BOOK_SUCCESS:
            return { ...state, userBooks: action.payload, error: ''};

        case ActionTypes.ADD_BOOK_FAIL:
            return { ...state, error: action.payload };

        case LOAD_START:
            return {...state, error: ''};

        default:
            return state;
    }
}
