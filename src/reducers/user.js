import { GET_USERDATA_REQUEST, GET_USERDATA_SUCCESS } from '../constants/User';

const initialState = {
  username: 'Аноним',
  password: '',
  fetching: false
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case GET_USERDATA_REQUEST:
      return {
        ...state,
        username: action.payload,
        fetching: true
      }

    case GET_USERDATA_SUCCESS:
      return {
        ...state,
        password: action.payload,
        fetching: false
      }

    default:
      return state;
  }
}
