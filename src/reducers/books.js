import { GET_ALL_BOOKS_SUCCESS, GET_ALL_BOOKS_FAIL, GET_RECENT_BOOKS_SUCCESS, GET_RECENT_BOOKS_FAIL, GET_BOOK_BY_ID_SUCCESS, GET_BOOK_BY_ID_FAIL } from '../constants/Book';


const initialState = {
  allBooks: [],
  bookById: {},
  recBooks: [],
  error: ''
}

export default function books(state = initialState, action) {

  switch (action.type) {
    
    case GET_ALL_BOOKS_SUCCESS:
      return {
        ...state,
        allBooks: action.payload,
        error: '',
      }

    case GET_ALL_BOOKS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case GET_BOOK_BY_ID_SUCCESS:
      return {
        ...state,
        bookById: action.payload,
        error: '',
      }

    case GET_BOOK_BY_ID_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case GET_RECENT_BOOKS_SUCCESS:
      return {
        ...state,
        recBooks: action.payload,
        error: '',
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
