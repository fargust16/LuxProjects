import * as ActionTypes from '../constants/Book';
import {loadStart, loadEnd} from './LoadActions';

import * as api from '../services/api';

export function handleGetAllBooks() {

    return (dispatch) => {

        loadStart(dispatch);

        api.getAllBooks()
            .then(data => {
                dispatch({
                    type: ActionTypes.GET_ALL_BOOKS_SUCCESS,
                    payload: data
                });
                loadEnd(dispatch);
            })
            .catch(err => {
                dispatch({
                    type: ActionTypes.GET_ALL_BOOKS_FAIL,
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
                    type: ActionTypes.GET_BOOK_BY_ID_SUCCESS,
                    payload: data
                });
                loadEnd(dispatch);
            })
            .catch(err => {
                dispatch({
                    type: ActionTypes.GET_BOOK_BY_ID_FAIL,
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
                    type: ActionTypes.GET_RECENT_BOOKS_SUCCESS,
                    payload: data
                });
                loadEnd(dispatch);
            })
            .catch(err => {
                dispatch({
                    type: ActionTypes.GET_RECENT_BOOKS_FAIL,
                    payload: err
                });
                loadEnd(dispatch);
            });
    }
}

export const handleAddNewComment = (commentData) => (dispatch) => {
    loadStart(dispatch);

    api.addComment(commentData)
        .then(data => {
            dispatch({
                type: ActionTypes.ADD_COMMENT_SUCCESS,
                payload: data,
                comment: commentData
            });

            loadEnd(dispatch);
        })
        .catch(err => {
            dispatch({
                type: ActionTypes.ADD_COMMENT_FAIL,
                payload: err
            });

            loadEnd(dispatch);
        })
};

export const handleAddReview = (review) => (dispatch) => {
    loadStart(dispatch);

    api.addReview(review)
        .then(data => {
            dispatch({
                type: ActionTypes.ADD_REVIEW_SUCCESS,
                payload: data,
                review: review
            });

            loadEnd(dispatch);
        })
        .catch(err => {
            dispatch({
                type: ActionTypes.ADD_REVIEW_FAIL,
                payload: err
            });

            loadEnd(dispatch);
        })
};

export const handleAddRecentBook = (recentData) => (dispatch) => {
    loadStart(dispatch);

    api.addRecentBook(recentData)
        .then(data => {
            dispatch({
                type: ActionTypes.ADD_RECENT_BOOK_SUCCESS,
                payload: data
            });

            loadEnd(dispatch);
        })
        .catch(err => {
            dispatch({
                type: ActionTypes.ADD_RECENT_BOOK_FAIL,
                payload: err
            });

            loadEnd(dispatch);
        })
};