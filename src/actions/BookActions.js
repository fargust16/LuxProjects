import { GET_ALL_BOOKS_REQUEST, 
  GET_ALL_BOOKS_SUCCESS, 
  GET_ALL_BOOKS_FAIL, 
  GET_RECENT_BOOKS_REQUEST, 
  GET_RECENT_BOOKS_SUCCESS, 
  GET_RECENT_BOOKS_FAIL, 
  GET_BOOK_BY_ID_REQUEST, 
  GET_BOOK_BY_ID_SUCCESS, 
  GET_BOOK_BY_ID_FAIL } from '../constants/Book';

import * as api from '../services/api';

export function handleGetAllBooks() {

  return (dispatch) => {

    dispatch({
      type: GET_ALL_BOOKS_REQUEST
    })

    api.getAllBooks()
      .then(data => {
        dispatch({
          type: GET_ALL_BOOKS_SUCCESS,
          payload: data
        })
      })
      .catch(err => {
        dispatch({
          type: GET_ALL_BOOKS_FAIL,
          payload: err
        })
      });
  }
}

export function handleGetBookInfo(bookId) {

  return (dispatch) => {

    dispatch({
      type: GET_BOOK_BY_ID_REQUEST
    })

    api.getBookInfo(bookId)
      .then(data => {
        dispatch({
          type: GET_BOOK_BY_ID_SUCCESS,
          payload: data
        })
      })
      .catch(err => {
        dispatch({
          type: GET_BOOK_BY_ID_FAIL,
          payload: err
        })
      });
  }
}

export function handleGetRecentBooks() {

  return (dispatch) => {

    dispatch({
      type: GET_RECENT_BOOKS_REQUEST
    })

    api.getRecentBooks()
      .then(data => {
        dispatch({
          type: GET_RECENT_BOOKS_SUCCESS,
          payload: data
        })
      })
      .catch(err => {
        dispatch({
          type: GET_RECENT_BOOKS_FAIL,
          payload: err
        })
      });
  }
}