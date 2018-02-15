import * as ActionTypes from "../constants/AddBook";
import {loadEnd, loadStart} from "./LoadActions";
import * as api from "../services/api";

export const getListOfGenres = () => (dispatch) => {
    loadStart(dispatch);

    api.getListOfGenres()
    .then(data => {
        dispatch({
            type: ActionTypes.GET_LIST_OF_GENRES_SUCCESS,
            payload: data,
        });

        loadEnd(dispatch);
    })
    .catch(err => {
        dispatch({
            type: ActionTypes.GET_LIST_OF_GENRES_FAIL,
            payload: err
        });

        loadEnd(dispatch);
    })
};

export const changeTitle = (data) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_TITLE_TEXT,
    payload: data,
});

export const changeAuthor = (data) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_AUTHOR_TEXT,
    payload: data,
});

export const changeGenre = (data) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_GENRE_TEXT,
    payload: data,
});

export const changeIsbn = (data) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_ISBN_TEXT,
    payload: data,
});

export const changeReleaseDate = (data) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_RELEASE_DATE,
    payload: data,
});

export const changeDescription = (data) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_DESCRIPTION_TEXT,
    payload: data,
});

export const changeText = (data) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_BOOK_TEXT,
    payload: data,
});

export const changeCover = (data) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_COVER_URL,
    payload: data,
});

export const changeTopics = (data) => (dispatch) => dispatch({
    type: ActionTypes.CHANGE_TOPICS_ARRAY,
    payload: data,
});

export const handleAddNewBook = (bookData) => (dispatch) => {
    loadStart(dispatch);

    api.addBook(bookData)
        .then(data => {
            dispatch({
                type: ActionTypes.ADD_BOOK_SUCCESS,
                payload: data,
            });

            loadEnd(dispatch);
        })
        .catch(err => {
            dispatch({
                type: ActionTypes.ADD_BOOK_FAIL,
                payload: err
            });

            loadEnd(dispatch);
        })
};