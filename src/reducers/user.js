import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL } from '../constants/User';

const initialState = {
  username: '',
  error: '',
  fetching: false
}

export default function user(state = initialState, action) {
  
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        fetching: true
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        username: action.payload,
        error: '',
        fetching: false
      }

    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
        fetching: false
      }

    case LOGOUT_SUCCESS:
      return {
        ...state,
        username: action.payload,
        error: ''
      }

    case LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state;
  }
}
