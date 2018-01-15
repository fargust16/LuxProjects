import { GET_USERDATA_REQUEST, GET_USERDATA_SUCCESS } from '../constants/User';

export function getUserData(user) {

  return (dispatch) => {
    dispatch({
      type: GET_USERDATA_REQUEST,
      payload: user
    })

    setTimeout(() => {
      dispatch({
        type: GET_USERDATA_SUCCESS,
        payload: 2906
      })
    }, 1000)
  }
}