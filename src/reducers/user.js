import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL } from '../constants/User';

const initialState = {
  username: '',
  error: ''
}

export default function user(state = initialState, action) {
  
  switch (action.type) {

    case LOGIN_SUCCESS:
      return {
        ...state,
        username: action.payload,
        error: ''
      }

    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload
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
