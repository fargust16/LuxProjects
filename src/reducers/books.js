import { GET_ALL_BOOKS_REQUEST, 
  GET_ALL_BOOKS_SUCCESS, 
  GET_ALL_BOOKS_FAIL, 
  GET_RECENT_BOOKS_REQUEST, 
  GET_RECENT_BOOKS_SUCCESS, 
  GET_RECENT_BOOKS_FAIL, 
  GET_BOOK_BY_ID_REQUEST, 
  GET_BOOK_BY_ID_SUCCESS, 
  GET_BOOK_BY_ID_FAIL } from '../constants/Book';

const initialState = {
  books: [],
  book: {},
  error: '',
  fetching: false
}

export default function books(state = initialState, action) {
  
  switch (action.type) {
    case GET_ALL_BOOKS_REQUEST:
      return {
        ...state,
        fetching: true
      }

    case GET_ALL_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload,
        error: '',
        fetching: false
      }

    case GET_ALL_BOOKS_FAIL:
      return {
        ...state,
        error: action.payload,
        fetching: false
      }

    case GET_BOOK_BY_ID_REQUEST:
      return {
        ...state,
        fetching: true
      }

    case GET_BOOK_BY_ID_SUCCESS:
      return {
        ...state,
        book: action.payload,
        error: ''
      }

    case GET_BOOK_BY_ID_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case GET_RECENT_BOOKS_REQUEST:
      return {
        ...state,
        fetching: true
      }

    case GET_RECENT_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload,
        error: ''
      }

    case GET_RECENT_BOOKS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state;
  }
}
