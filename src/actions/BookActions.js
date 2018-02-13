import {
    GET_ALL_BOOKS_SUCCESS,
    GET_ALL_BOOKS_FAIL,
    GET_RECENT_BOOKS_SUCCESS,
    GET_RECENT_BOOKS_FAIL,
    GET_BOOK_BY_ID_SUCCESS,
    GET_BOOK_BY_ID_FAIL
} from '../constants/Book';
import {loadStart, loadEnd} from './LoadActions';

import * as api from '../services/api';

export function handleGetAllBooks() {

    return (dispatch) => {

        loadStart(dispatch);

        api.getAllBooks()
            .then(data => {
                dispatch({
                    type: GET_ALL_BOOKS_SUCCESS,
                    payload: data
                });
            })
            .catch(err => {
                dispatch({
                    type: GET_ALL_BOOKS_FAIL,
                    payload: err
                });
                loadEnd(dispatch);
            });
    }
}

export function handleGetBookInfo(bookId) {

    return (dispatch) => {

        loadStart(dispatch);

        api.getBookInfo(bookId)
            .then(data => {
                dispatch({
                    type: GET_BOOK_BY_ID_SUCCESS,
                    payload: data
                });
                loadEnd(dispatch);
            })
            .catch(err => {
                dispatch({
                    type: GET_BOOK_BY_ID_FAIL,
                    payload: err
                });
                loadEnd(dispatch);
            });
    }
}

export function handleGetRecentBooks(userId) {

    return (dispatch) => {

        loadStart(dispatch);

        api.getRecentBooks(userId)
            .then(data => {
                dispatch({
                    type: GET_RECENT_BOOKS_SUCCESS,
                    payload: data
                });
                loadEnd(dispatch);
            })
            .catch(err => {
                dispatch({
                    type: GET_RECENT_BOOKS_FAIL,
                    payload: err
                });
                loadEnd(dispatch);
            });
    }
}